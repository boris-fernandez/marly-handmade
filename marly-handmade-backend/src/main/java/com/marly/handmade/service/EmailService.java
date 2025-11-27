package com.marly.handmade.service;

import com.marly.handmade.domain.Pago;

public interface EmailService {
    void enviarConfirmacionPago(Pago pago);
}