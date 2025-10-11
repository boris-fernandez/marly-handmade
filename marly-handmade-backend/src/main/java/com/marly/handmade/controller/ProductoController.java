package com.marly.handmade.controller;

import com.marly.handmade.domain.producto.data.ProductoRequest;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.data.ProductoUpdate;
import com.marly.handmade.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("producto")
public class ProductoController {

    private ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<ProductoResponse>  crearProducto (@RequestBody @Valid ProductoRequest productoRequest, UriComponentsBuilder builder){
        ProductoResponse productoResponse =  productoService.crearProducto(productoRequest);
        URI uri = builder.path("/producto/{id}").buildAndExpand(productoResponse.id()).toUri();
        return ResponseEntity.created(uri).body(productoResponse);
    }

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> listarProductos (){
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("{nombre}")
    public ResponseEntity<ProductoResponse> mostrarPorNombre(@PathVariable String nombre){
        return ResponseEntity.ok(productoService.mostrarPorNombre(nombre));
    }


    @GetMapping("mostrar/{id}")
    public ResponseEntity<ProductoResponse> mostrarPorId(@PathVariable long id){
        return ResponseEntity.ok(productoService.mostrarPorId(id));
    }

    @PatchMapping("{id}")
    public ResponseEntity<ProductoResponse> update(@PathVariable long id, @RequestBody ProductoUpdate productoUpdate){
        return ResponseEntity.ok(productoService.update(id, productoUpdate));
    }
}
