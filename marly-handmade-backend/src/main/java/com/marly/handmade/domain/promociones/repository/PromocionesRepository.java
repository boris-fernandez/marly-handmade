package com.marly.handmade.domain.promociones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marly.handmade.domain.promociones.modal.Promociones;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocionesRepository extends JpaRepository<Promociones,Long> {
    
}
