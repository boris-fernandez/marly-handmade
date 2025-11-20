package com.marly.handmade.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity 
@Table(name = "pagos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "preference_id", unique = true)
    private String preferenceId;
    
    @Column(name = "payment_id")
    private String paymentId;
    
    @Column(name = "estado")
    private String estado; 
    
    @Column(name = "monto", precision = 10, scale = 2)
    private BigDecimal monto;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "email_cliente")
    private String emailCliente;
    
    @Column(name = "cliente_id")
    private Long clienteId;
    
    @Column(name = "pedido_id")
    private Long pedidoId;
    
    @Column(name = "merchant_order_id")
    private String merchantOrderId;
    
    @Column(name = "tipo_pago")
    private String tipoPago; 
    
    @Column(name = "metodo_pago")
    private String metodoPago; 
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    @Column(name = "fecha_aprobacion")
    private LocalDateTime fechaAprobacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}