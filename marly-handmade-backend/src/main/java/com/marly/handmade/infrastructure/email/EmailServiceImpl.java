package com.marly.handmade.infrastructure.email;

import com.marly.handmade.domain.Pago;
import com.marly.handmade.service.EmailService;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Override
    public void enviarConfirmacionPago(Pago pago) {
        log.info("📧 Intentando enviar confirmación de pago a: {}", pago.getEmailCliente());
        try {
            log.info("✅ Simulación de envío de correo de confirmación de pago realizada.");
        } catch (Exception e) {
            log.error("❌ Error al intentar enviar email de confirmación: {}", e.getMessage());
        }
    }
}