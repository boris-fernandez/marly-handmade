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
        String shippingInfo,
        Boolean status
) {
    public ProductoResponse(Producto p) {
        this(
            p.getIdProducto(),
            p.getNombre(),
            p.getDescripcion(),
            p.getPrecio(),
            p.getStock(),
            p.getFotoPrincipal(),
            p.getFotoSecundario(),
            p.getFotoTerciario(),
            p.getCategoria(),
            p.getDetails(),
            p.getCare(),
            p.getShippingInfo(),
            p.getStatus()
        );
    }
}
