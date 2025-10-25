package com.marly.handmade.domain.pedido.service;

import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;

public interface IPedidoService {
  PedidoResponse createPedido(PedidoRequest request);
  
}
