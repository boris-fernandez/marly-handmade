package com.marly.handmade.domain.cliente.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByCorreo(String correo);
}
