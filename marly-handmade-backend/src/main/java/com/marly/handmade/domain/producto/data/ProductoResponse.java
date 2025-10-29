package com.marly.handmade.domain.producto.data;

import com.marly.handmade.domain.producto.modal.Producto;

public record ProductoResponse(
        Long id,
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
        String shipping_info
) {

    public ProductoResponse(Producto producto) {
        this(
            producto.getIdProducto(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getPrecio(),
            producto.getStock(),
            producto.getFotoPrincipal(),
            producto.getFotoSecundario(),
            producto.getFotoTerciario(),
            producto.getCategoria(),
            producto.getDetails(),
            producto.getCare(),
            producto.getShipping_info()
        );
    }
}
