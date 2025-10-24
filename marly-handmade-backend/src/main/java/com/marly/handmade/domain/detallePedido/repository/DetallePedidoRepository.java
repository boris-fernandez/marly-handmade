package com.marly.handmade.domain.detallePedido.repository;

import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
}
