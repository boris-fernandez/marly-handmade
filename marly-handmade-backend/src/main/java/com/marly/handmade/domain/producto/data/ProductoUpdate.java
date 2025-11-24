package com.marly.handmade.domain.producto.data;

public record ProductoUpdate(
        String nombre,
        String descripcion,
        Double precio,
        Integer stock,
        String fotoPrincipal,
        String fotoSecundario,
        String fotoTerciario,
        String categoria,
        String details,
        String care,
        String shippingInfo,
        Boolean status
) {}
