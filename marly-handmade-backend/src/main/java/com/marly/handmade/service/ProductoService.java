package com.marly.handmade.service;

import com.marly.handmade.domain.producto.data.ProductoRequest;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.data.ProductoUpdate;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public ProductoResponse crearProducto(ProductoRequest productoRequest){
        if(productoRepository.findByNombre(productoRequest.nombre()) != null){
            throw new RuntimeException("Ya existe un producto con este nombre: " + productoRequest.nombre());
        }
        Producto producto = Producto.builder()
                .nombre(productoRequest.nombre())
                .precio(productoRequest.precio())
                .stock(productoRequest.stock())
                .fotoPrincipal(productoRequest.fotoPrincipal())
                .fotoSecundario(productoRequest.fotoSecundario())
                .fotoTerciario(productoRequest.fotoTerciario())
                .categoria(productoRequest.categoria())
                .build();

        productoRepository.save(producto);
        return new ProductoResponse(producto);
    }

    public List<ProductoResponse> listarProductos(){
        return productoRepository.findAll().stream().map(ProductoResponse::new).toList();
    }


    public ProductoResponse mostrarPorNombre(String nombre) {
        Producto producto = productoRepository.findByNombre(nombre);
        if (producto == null) throw new RuntimeException("El producto con ese nombre no existe");
        return new ProductoResponse(producto);
    }

    public ProductoResponse mostrarPorId(long id) {
        return new ProductoResponse(productoRepository.findById(id).orElseThrow(() -> new RuntimeException("El producto con ese id no existe")));
    }

    public ProductoResponse update(long id, ProductoUpdate productoUpdate) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("El producto con ese id no existe"));
        producto.update(productoUpdate);
        productoRepository.save(producto);
        return new ProductoResponse(producto);
    }
}
