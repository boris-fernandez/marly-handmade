package com.marly.handmade.infrastructure.email;

import com.marly.handmade.domain.Pago;
import com.marly.handmade.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired
    private EmailApiConsumer emailApiConsumer; 

    // Implementación mínima para la confirmación de pago
    @Override
    public void enviarConfirmacionPago(Pago pago) {
        log.info("📧 Intentando enviar confirmación de pago a: {}", pago.getEmailCliente());
        
        // **NOTA:** Tu EmailApiConsumer actual solo maneja el formato de "restablecimiento de contraseña".
        // Para enviar la confirmación de pago, necesitarías modificar:
        // 1. Un nuevo método en EmailApiConsumer (ej. sendConfirmacionPago).
        // 2. Un nuevo template HTML (/templates/pago-confirmado.html).
        
        // Como no tenemos el template de pago, solo hacemos un log para no bloquear el flujo:
        try {
            log.info("✅ Simulación de envío de correo de confirmación de pago realizada.");
        } catch (Exception e) {
            log.error("❌ Error al intentar enviar email de confirmación: {}", e.getMessage());
        }
    }
}