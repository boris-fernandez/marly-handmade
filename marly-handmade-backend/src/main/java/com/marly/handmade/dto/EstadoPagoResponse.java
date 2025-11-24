package com.marly.handmade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

// ===== Response de estado de pago =====
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoPagoResponse {
    private Long id;
    private String preferenceId;
    private String paymentId;
    private String estado;
    private BigDecimal monto;
    private String emailCliente;
    private String metodoPago;
    private String fechaCreacion;
    private String fechaAprobacion;
}