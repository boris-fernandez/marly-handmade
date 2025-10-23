package com.marly.handmade.service;

import org.springframework.stereotype.Service;

import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.domain.promociones.modal.Promociones;
import com.marly.handmade.domain.promociones.repository.PromocionesRepository;


@Service
public class PromocionesService {
    
    private PromocionesRepository promocionesRepository;
    private ProductoRepository productoRepository;

    public PromocionesService(PromocionesRepository promocionesRepository, ProductoRepository productoRepository) {
        this.promocionesRepository = promocionesRepository;
        this.productoRepository = productoRepository;
    }

    public PromocionesResponse crearPromociones(PromocionesRequest promocionesRequest){
        Producto producto = productoRepository.findById(promocionesRequest.id_producto()).orElseThrow(()->new RuntimeException("NO EXISTE UN PRODUCTO CON EL ID:"+ promocionesRequest.id_producto()));
        Promociones promociones = Promociones.builder()
        .nombre(promocionesRequest.nombre())
        .descripcion(promocionesRequest.descripcion())
        .fechaInicio(promocionesRequest.fechaInicio())
        .fechaFin(promocionesRequest.fechaFin())
        .porcentajeDescuento(promocionesRequest.porcentajeDescuento())
        .producto(producto)
        .build();

        promocionesRepository.save(promociones);
        return new PromocionesResponse(promociones, producto);
    }


}
