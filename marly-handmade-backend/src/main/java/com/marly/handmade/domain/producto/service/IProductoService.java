package com.marly.handmade.domain.producto.service;

import java.util.List;

import com.marly.handmade.domain.producto.data.ProductoRequest;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.data.ProductoUpdate;

public interface IProductoService {
  ProductoResponse crearProducto(ProductoRequest productoRequest);
  List<ProductoResponse> listarProductos();
  ProductoResponse buscar(String nombre, Long id);
  ProductoResponse update(long id, ProductoUpdate productoUpdate);
}
