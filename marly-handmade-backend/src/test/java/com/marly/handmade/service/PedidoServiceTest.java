package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.detallePedido.repository.DetallePedidoRepository;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;
    @Mock
    private DetallePedidoRepository detallePedidoRepository;
    @Mock
    private ProductoRepository productoRepository;
    @Mock
    private ClienteRepository clienteRepository;

    @Test
    void createPedido() {
    }
}