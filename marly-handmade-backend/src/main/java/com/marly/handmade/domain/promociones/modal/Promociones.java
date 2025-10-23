package com.marly.handmade.domain.promociones.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

import com.marly.handmade.domain.producto.modal.Producto;


@Entity
@Table (name = "Promocion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class Promociones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idPromociones;

    private String nombre;

    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private  LocalDate fechaFin;

    @Column(name = "porcentaje_descuento")
    private float porcentajeDescuento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto")

    private Producto producto;
    
}