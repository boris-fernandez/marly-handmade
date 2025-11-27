package com.marly.handmade.domain.cliente.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ClienteUsuarioDTO {
    private Long idCliente;
    private Long idUsuario;
    private String username;
    private String nombres;
    private String apellidos;
    private String direccion;
    private LocalDate fechaNacimiento;
    private String identificacion;
    private Integer puntosFidelizacion;
    private String correo;
    private String telefono;
}
