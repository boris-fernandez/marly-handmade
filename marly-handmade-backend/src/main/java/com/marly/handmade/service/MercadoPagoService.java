package com.marly.handmade.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import com.marly.handmade.domain.Pago;
import com.marly.handmade.dto.*;
import com.marly.handmade.repository.PagoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MercadoPagoService {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${app.backend.url}")
    private String backendUrl;

    @Autowired
    private PagoRepository pagoRepository;
    @Autowired
    private EmailService emailService;

    @PostConstruct
    public void init() {
        log.info("Access Token recibido (inicio): {}",
                accessToken.substring(0, Math.min(accessToken.length(), 10)));
        MercadoPagoConfig.setAccessToken(accessToken);
    }

    @Transactional
    public PreferenciaResponse crearPreferencia(CrearPreferenciaRequest request) throws MPException, MPApiException {
        try {
            log.info("Creando preferencia de pago para: {}", request.getEmailCliente());

            List<PreferenceItemRequest> items = new ArrayList<>();
            BigDecimal montoTotal = BigDecimal.ZERO;

            for (ItemPago item : request.getItems()) {
                PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(item.getTitulo())
                    .categoryId("jewelry")
                    .quantity(item.getCantidad())
                    .currencyId("PEN")
                    .unitPrice(item.getPrecioUnitario())
                    .build();
                
                items.add(itemRequest);
                BigDecimal cantidad = new BigDecimal(item.getCantidad());
                montoTotal = montoTotal.add(item.getPrecioUnitario().multiply(cantidad));
            }

            // Construir payer sin teléfono para evitar errores
            PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .name(request.getComprador().getNombre())
                .surname(request.getComprador().getApellido())
                .email(request.getComprador().getEmail())
                .identification(IdentificationRequest.builder()
                    .type(request.getComprador().getTipoIdentificacion())
                    .number(request.getComprador().getIdentificacion())
                    .build())
                .build();
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success(frontendUrl + "/compra-exitosa")
                .failure(frontendUrl + "/compra-fallida")
                .pending(frontendUrl + "/compra-pendiente")
                .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .payer(payer)
                .backUrls(backUrls)
                .autoReturn("approved")
                .notificationUrl(backendUrl + "/api/pagos/webhook")
                .statementDescriptor("MARLY HANDMADE")
                .externalReference("ORDER-" + System.currentTimeMillis())
                .expires(true)
                .expirationDateFrom(OffsetDateTime.now())
                .expirationDateTo(OffsetDateTime.now().plusDays(7))
                .build();

            PreferenceClient client = new PreferenceClient();
            log.info("PreferenceRequest: {}", preferenceRequest.toString());
            Preference preference = client.create(preferenceRequest);

            Pago pago = new Pago();
            pago.setPreferenceId(preference.getId());
            pago.setEstado("pending");
            pago.setMonto(montoTotal);
            pago.setDescripcion("Compra en Marly Handmade - " + items.size() + " productos");
            pago.setEmailCliente(request.getEmailCliente());
            pago.setClienteId(request.getComprador().getClienteId());
            this.pagoRepository.save(pago);

            log.info("Preferencia creada exitosamente: {}", preference.getId());
            log.info("Monto total: S/ {}", montoTotal);

            return new PreferenciaResponse(
                preference.getId(),
                preference.getInitPoint(),
                preference.getSandboxInitPoint(),
                "success",
                "Preferencia de pago creada exitosamente"
            );

        } catch (MPException | MPApiException e) {
            log.error("Error al crear preferencia: {}", e.getMessage());
            throw e;
        }
    }

    @Transactional
    public void procesarWebhook(String tipo, String data) {
        try {
            log.info("Webhook recibido - Tipo: {}, Data: {}", tipo, data);

            if ("payment".equals(tipo)) {
                Long paymentId = Long.parseLong(data);
                actualizarEstadoPago(paymentId);
            }

        } catch (Exception e) {
            log.error("Error procesando webhook: {}", e.getMessage());
        }
    }

    @Transactional
    public void actualizarEstadoPago(Long paymentId) {
        try {
            log.info("Consultando pago en MercadoPago: {}", paymentId);
            
            PaymentClient client = new PaymentClient();
            Payment payment = client.get(paymentId);

            log.info("Estado del pago: {}", payment.getStatus());

            Optional<Pago> pagoOpt = pagoRepository.findByPaymentId(String.valueOf(paymentId));
            
            if (pagoOpt.isEmpty()) {
                String preferenceId = payment.getMetadata() != null ? 
                    (String) payment.getMetadata().get("preference_id") : null;
                
                if (preferenceId != null) {
                    pagoOpt = pagoRepository.findByPreferenceId(preferenceId);
                }
            }

            if (pagoOpt.isPresent()) {
                Pago pago = pagoOpt.get();
                String estadoAnterior = pago.getEstado();
                
                pago.setPaymentId(String.valueOf(paymentId));
                pago.setEstado(payment.getStatus());
                pago.setTipoPago(payment.getPaymentTypeId());
                pago.setMetodoPago(payment.getPaymentMethodId());
                
                if (payment.getOrder() != null) {
                    pago.setMerchantOrderId(String.valueOf(payment.getOrder().getId()));
                }

                if ("approved".equals(payment.getStatus())) {
                    pago.setFechaAprobacion(LocalDateTime.now());
                    log.info("¡PAGO APROBADO! ID: {} | Cliente: {}", paymentId, pago.getEmailCliente());
                    log.info("Monto: S/ {} | Método: {}", pago.getMonto(), payment.getPaymentMethodId());
                    
                    if (emailService != null) {
                        emailService.enviarConfirmacionPago(pago);
                    }
                }

                pagoRepository.save(pago);
                log.info("Estado actualizado de '{}' a '{}'", estadoAnterior, payment.getStatus());
            } else {
                log.warn("No se encontró el pago en la base de datos para payment_id: {}", paymentId);
            }

        } catch (MPException | MPApiException e) {
            log.error("Error de MercadoPago: {}", e.getMessage(), e);
        } catch (Exception e) {
            log.error("Error inesperado: {}", e.getMessage(), e);
        }
    }

    public EstadoPagoResponse consultarEstadoPago(String preferenceId) {
        log.info("Consultando estado del pago: {}", preferenceId);
        
        Optional<Pago> pagoOpt = pagoRepository.findByPreferenceId(preferenceId);
        
        if (pagoOpt.isPresent()) {
            Pago pago = pagoOpt.get();
            log.info("Pago encontrado - Estado: {} | Monto: S/ {}", pago.getEstado(), pago.getMonto());
            
            return new EstadoPagoResponse(
                pago.getId(),
                pago.getPreferenceId(),
                pago.getPaymentId(), 
                pago.getEstado(),
                pago.getMonto(),
                pago.getEmailCliente(),
                pago.getMetodoPago(),
                pago.getFechaCreacion().toString(),
                pago.getFechaAprobacion() != null ? pago.getFechaAprobacion().toString() : null
            );
        } 
        
        log.warn("No se encontró el pago con preference_id: {}", preferenceId);
        return null;
    }
}