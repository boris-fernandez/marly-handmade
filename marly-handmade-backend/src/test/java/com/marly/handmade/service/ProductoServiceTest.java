package com.marly.handmade.service;

import com.marly.handmade.domain.producto.data.ProductoRequest;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.data.ProductoUpdate;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;


    @DisplayName("Test para verificar que se esta creando un producto y no sale exceptiones")
    @Test
    void crearProducto() {
        ProductoRequest request = new ProductoRequest("Collar", 20.0, 10, "", "", "", "");
        BDDMockito.given(productoRepository.save(Mockito.any(Producto.class))).willAnswer(invocation -> invocation.getArgument(0));
        BDDMockito.given(productoRepository.findByNombre(Mockito.anyString())).willReturn(null);

        ProductoResponse response = productoService.crearProducto(request);

        assertThat(response).isNotNull();
        assertThat(response.nombre()).isEqualTo("Collar");
        verify(productoRepository).save(any(Producto.class));
        verify(productoRepository).findByNombre(Mockito.anyString());
    }

    @DisplayName("Test para verificar que trae todos los productos")
    @Test
    void listarProductos() {
        List<Producto> productoList = Arrays.asList(new Producto(1L,"Collar", 10.0, 3, "", "", "", ""),
                new Producto(1L,"Arete", 20.0, 5, "", "", "", ""));
        BDDMockito.given(productoRepository.findAll()).willReturn(productoList);

        List<ProductoResponse> productoResponses = productoService.listarProductos();

        assertThat(productoResponses.size()).isPositive();
        assertThat(productoResponses.size()).isEqualTo(2);
        assertThat(productoResponses.get(0).nombre()).isEqualTo("Collar");

    }

    @DisplayName("Test para verificar que sale una exception cuando no existe un producot con ese nombre")
    @Test
    void mostrarPorNombre() {
        Producto producto = new Producto();
        producto.setNombre("Collar");
        BDDMockito.given(productoRepository.findByNombre(anyString())).willReturn(null);

        Assertions.assertThrows(RuntimeException.class, () ->
                productoService.mostrarPorNombre("Collar")
        );
    }

    @DisplayName("Test para verificar que me trae un producto con un id existente")
    @Test
    void mostrarPorId() {
        Producto producto = new Producto(1L,"Collar", 10.0, 3, "", "", "", "");
        BDDMockito.given(productoRepository.findById(anyLong())).willReturn(Optional.of(producto));

        ProductoResponse productoResponse = productoService.mostrarPorId(1L);

        assertThat(productoResponse).isNotNull();
        assertThat(productoResponse.nombre()).isEqualTo("Collar");
    }

    @DisplayName("Test para comprbar que se actualizan los datos y no salen exceptiones")
    @Test
    void update() {
        Producto producto = new Producto(1L,"Collar", 10.0, 3, "", "", "", "");
        BDDMockito.given(productoRepository.findById(anyLong())).willReturn(Optional.of(producto));
        BDDMockito.given(productoRepository.save(Mockito.any(Producto.class))).willAnswer(invocation -> invocation.getArgument(0));

        ProductoUpdate productoUpdate = new ProductoUpdate( "hola", 20.0, 5, "foto1", "foto2", "foto3", "CategoriaX");
        ProductoResponse productoResponse = productoService.update(1L, productoUpdate);

        assertThat(productoResponse.nombre()).isEqualTo("hola");
        assertThat(productoResponse.precio()).isEqualTo(20.0);
        assertThat(productoResponse.stock()).isEqualTo(5);
        assertThat(productoResponse.categoria()).isEqualTo("CategoriaX");
    }

    @DisplayName("Test para probar que sale una exception cuando no existe un producto con el id")
    @Test
    void updateProductoNoExisteLanzaException(){
        BDDMockito.given(productoRepository.findById(anyLong())).willReturn(Optional.empty());

        ProductoUpdate productoUpdate = new ProductoUpdate(
                "Pulsera", 20.0, 5, "foto1", "foto2", "foto3", "CategoriaX"
        );
        Assertions.assertThrows(RuntimeException.class, ()->{
            productoService.update(1L, productoUpdate);
        });

        verify(productoRepository, never()).save(any(Producto.class));
    }
}