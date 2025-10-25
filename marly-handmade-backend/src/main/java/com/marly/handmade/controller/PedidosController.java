package com.marly.handmade.controller;

import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.domain.pedido.service.IPedidoService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("pedido")
public class PedidosController {

    private final IPedidoService pedidoService;

    public PedidosController(IPedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> createPedido(@RequestBody @Valid PedidoRequest request, UriComponentsBuilder builder){
        PedidoResponse pedidoResponse = pedidoService.createPedido(request);
        URI uri = builder.path("/pedido/{id}").buildAndExpand(pedidoResponse.id()).toUri();
        log.info("Pedido creado correctamente: uri={}", uri);
        return ResponseEntity.created(uri).body(pedidoResponse);
    }
}
