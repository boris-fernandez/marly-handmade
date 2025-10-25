package com.marly.handmade.domain.promociones.data;

import com.marly.handmade.domain.producto.data.ProductoResponse;

import java.time.LocalDate;

public record PromocionesUpdate(
        String nombre,
        String descripcion,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        Float porcentajeDescuento,
        ProductoResponse producto,
        Long productoId
) {

}
