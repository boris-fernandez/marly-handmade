package com.marly.handmade.controller;

import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("pedido")
public class PedidosController {

    private PedidoService pedidoService;

    public PedidosController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> createPedido(@RequestBody @Valid PedidoRequest request, UriComponentsBuilder builder){
        PedidoResponse pedidoResponse = pedidoService.createPedido(request);
        URI uri = builder.path("/producto/{id}").buildAndExpand(pedidoResponse.id()).toUri();
        return ResponseEntity.created(uri).body(pedidoResponse);
    }
}
