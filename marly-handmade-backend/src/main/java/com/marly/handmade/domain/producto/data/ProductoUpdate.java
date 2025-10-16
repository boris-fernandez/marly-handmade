package com.marly.handmade.domain.producto.data;

public record ProductoUpdate(
        String nombre,
        Float precio,
        Integer stock,
        String fotoPrincipal,
        String fotoSecundario,
        String fotoTerciario,
        String categoria
) {
}
