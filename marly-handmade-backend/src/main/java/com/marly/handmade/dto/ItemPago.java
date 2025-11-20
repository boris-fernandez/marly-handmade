package com.marly.handmade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

// ===== Item individual del carrito =====
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPago {
    private String titulo;
    private String descripcion;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private String imagenUrl;
    private Long productoId;
}