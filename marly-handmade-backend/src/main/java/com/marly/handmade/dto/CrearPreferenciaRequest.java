package com.marly.handmade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

// ===== Request para crear preferencia de pago =====
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearPreferenciaRequest {
    private List<ItemPago> items;
    private DatosComprador comprador;
    private String emailCliente;
}