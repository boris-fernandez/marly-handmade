package com.marly.handmade.controller;

import com.mercadopago.exceptions.MPApiException;
import com.marly.handmade.dto.CrearPreferenciaRequest;
import com.marly.handmade.dto.EstadoPagoResponse;
import com.marly.handmade.dto.PreferenciaResponse;
import com.marly.handmade.service.MercadoPagoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*") // En producción, especificar dominio luego
@Slf4j
public class PagoController {

    @Autowired
    private MercadoPagoService mercadoPagoService;


    @PostMapping("/crear-preferencia")
    public ResponseEntity<?> crearPreferencia(@RequestBody CrearPreferenciaRequest request) {
        try {
            log.info("Recibida solicitud para crear preferencia de pago");
            
            if (request.getItems() == null || request.getItems().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Debe incluir al menos un producto"));
            }
            
            if (request.getComprador() == null || request.getComprador().getEmail() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Datos del comprador incompletos"));
            }

            PreferenciaResponse response = mercadoPagoService.crearPreferencia(request);
            return ResponseEntity.ok(response);

        } catch (MPApiException e) {
            log.error("Error de MercadoPago: {}", e.getApiResponse().getContent());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "error", "Error al procesar el pago",
                    "mensaje", e.getApiResponse().getContent()
                ));
        } catch (Exception e) {
            log.error("Error inesperado: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error interno del servidor"));
        }
    }


    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String data,
            @RequestBody(required = false) Map<String, Object> body) {
        
        try {
            log.info("Webhook recibido - Type: {}, Data: {}", type, data);
            log.info("Body completo: {}", body);

            if (type != null && data != null) {
                mercadoPagoService.procesarWebhook(type, data);
            }

            return ResponseEntity.ok().build();

        } catch (Exception e) {
            log.error("Error procesando webhook: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/estado/{preferenceId}")
    public ResponseEntity<?> consultarEstado(@PathVariable String preferenceId) {
        try {
            EstadoPagoResponse response = mercadoPagoService.consultarEstadoPago(preferenceId);
            
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Pago no encontrado"));
            }

        } catch (Exception e) {
            log.error("Error consultando estado: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error al consultar el estado del pago"));
        }
    }


    @PostMapping("/actualizar-estado/{paymentId}")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long paymentId) {
        try {
            mercadoPagoService.actualizarEstadoPago(paymentId);
            return ResponseEntity.ok(Map.of("mensaje", "Estado actualizado correctamente"));

        } catch (Exception e) {
            log.error("Error actualizando estado: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error al actualizar el estado"));
        }
    }


    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "MercadoPago Payment Gateway"
        ));
    }
}