package com.marly.handmade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// ===== Response con URL de pago =====
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreferenciaResponse {
    private String preferenceId;
    private String initPoint; 
    private String sandboxInitPoint;
    private String status;
    private String mensaje;
}