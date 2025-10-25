package com.marly.handmade.domain.promociones.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import com.marly.handmade.domain.promociones.modal.Promociones;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromocionesRepository extends JpaRepository<Promociones,Long> {
    Promociones findByProducto(Producto producto);
    Optional<Promociones> findByNombre(String nombre);
    
}
