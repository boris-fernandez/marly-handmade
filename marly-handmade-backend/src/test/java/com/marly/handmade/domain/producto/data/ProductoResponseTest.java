package com.marly.handmade.domain.producto.data;

import com.marly.handmade.domain.producto.modal.Producto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class ProductoResponseTest {

    @Test
    void constructor_mapsFields() {
        Producto p = Producto.builder()
                .idProducto(5L)
                .nombre("Zapato")
                .precio(33.5)
                .stock(7)
                .fotoPrincipal("f1")
                .fotoSecundario("f2")
                .fotoTerciario("f3")
                .categoria("calzado")
                .details("d")
                .care("c")
                .shippingInfo("s")
                .descripcion("desc")
                .status(true)
                .build();

        ProductoResponse resp = new ProductoResponse(p);

        Assertions.assertEquals(5L, resp.id());
        Assertions.assertEquals("Zapato", resp.nombre());
        Assertions.assertEquals(33.5, resp.precio());
        Assertions.assertEquals(7, resp.stock());
        Assertions.assertEquals("calzado", resp.categoria());
        Assertions.assertEquals("desc", resp.descripcion());
        Assertions.assertTrue(resp.status());
    }
}
