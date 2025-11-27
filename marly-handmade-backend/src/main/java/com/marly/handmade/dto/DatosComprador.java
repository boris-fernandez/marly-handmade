package com.marly.handmade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// ===== Datos del comprador =====
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatosComprador {
    private Long clienteId;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String identificacion;
    private String tipoIdentificacion; 
}