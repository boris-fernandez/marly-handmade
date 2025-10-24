package com.marly.handmade.domain.producto.data;

import jakarta.validation.constraints.NotNull;

public record ProductoRequest(
        @NotNull(message = "El nombre no puede estar vacio")
        String nombre,
        Double precio,
        Integer stock,
        String fotoPrincipal,
        String fotoSecundario,
        String fotoTerciario,
        String categoria
) {
}
