package com.marly.handmade.repository;

import com.marly.handmade.domain.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    
    Optional<Pago> findByPreferenceId(String preferenceId);
    
    Optional<Pago> findByPaymentId(String paymentId);
    
    List<Pago> findByClienteId(Long clienteId);
    
    List<Pago> findByEstado(String estado);
    
    List<Pago> findByEmailCliente(String email);
    
    Optional<Pago> findByPedidoId(Long pedidoId);
}