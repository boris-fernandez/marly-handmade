package com.marly.handmade.domain.reclamaciones.repository;

import com.marly.handmade.domain.reclamaciones.modal.Reclamaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamacionesRepository extends JpaRepository <Reclamaciones, Long> {

    Reclamaciones findByCliente_Nombres(String nombre);
}
