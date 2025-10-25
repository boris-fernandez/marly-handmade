package com.marly.handmade.domain.producto.data;

import com.marly.handmade.domain.producto.modal.Producto;

public record ProductoResponse(
        Long id,
        String nombre,
        Double precio,
        Integer stock,
        String fotoPrincipal,
        String fotoSecundario,
        String fotoTerciario,
        String categoria
) {

    public ProductoResponse(Producto producto){
        this(producto.getIdProducto(), producto.getNombre(), producto.getPrecio(), producto.getStock(), producto.getFotoPrincipal(), producto.getFotoSecundario(),
                producto.getFotoTerciario(), producto.getCategoria());
    }
}
