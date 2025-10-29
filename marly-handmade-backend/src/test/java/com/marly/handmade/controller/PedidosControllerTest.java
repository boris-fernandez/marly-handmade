package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.detallePedido.data.DetallePedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.service.PedidoService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Date;
import java.util.List;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.data.response.DatosCliente;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PedidosController.class)
@AutoConfigureMockMvc(addFilters = false)
class PedidosControllerTest extends ControllerTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PedidoService pedidoService;

    @Test
    void updatePedido() throws Exception {
    // mock does nothing (void)
    BDDMockito.doNothing().when(pedidoService).updatePedido(1L);

    ResultActions result = mockMvc.perform(
        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch("/pedido/1")
    );

    result.andDo(print())
        .andExpect(status().isOk());
    }

    @Test
    void listarPedidos() throws Exception {
    Cliente cliente = Cliente.builder().id(1L).nombres("Juan").build();
    PedidoResponse productoResponse = new PedidoResponse(1L, new Date(), "Calle Falsa 123", 200.0, new DatosCliente(cliente), List.of());
    BDDMockito.given(pedidoService.listarPedidos()).willReturn(List.of(productoResponse));

    ResultActions response = mockMvc.perform(
        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido")
    );

    response.andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void listarPedidoPorCliente() throws Exception {
    Cliente cliente = Cliente.builder().id(1L).nombres("Juan").build();
    PedidoResponse productoResponse = new PedidoResponse(1L, new Date(), "Calle Falsa 123", 200.0, new DatosCliente(cliente), List.of());
    BDDMockito.given(pedidoService.listarPedidoPorCliente("Juan")).willReturn(List.of(productoResponse));

    ResultActions response = mockMvc.perform(
        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/cliente/nombre/Juan")
    );

    response.andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void mostrarPedidosPorId() throws Exception {
    Cliente cliente = Cliente.builder().id(1L).nombres("Juan").build();
    PedidoResponse productoResponse = new PedidoResponse(1L, new Date(), "Calle Falsa 123", 200.0, new DatosCliente(cliente), List.of());
    BDDMockito.given(pedidoService.mostrarPedidosPorId(1L)).willReturn(productoResponse);

    ResultActions response = mockMvc.perform(
        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/mostrar/1")
    );

    response.andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void listarPedidoPorestado() throws Exception {
    Cliente cliente = Cliente.builder().id(1L).nombres("Juan").build();
    PedidoResponse productoResponse = new PedidoResponse(1L, new Date(), "Calle Falsa 123", 200.0, new DatosCliente(cliente), List.of());
    BDDMockito.given(pedidoService.listarPedidoPorestado(false)).willReturn(List.of(productoResponse));

    ResultActions response = mockMvc.perform(
        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/estado/false")
    );

    response.andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1));
    }

}
