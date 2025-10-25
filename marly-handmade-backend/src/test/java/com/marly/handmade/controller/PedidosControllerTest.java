package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.detallePedido.data.DetallePedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.domain.pedido.service.IPedidoService;
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
    private IPedidoService pedidoService;

    @Test
    void createPedido() throws Exception {
    DetallePedidoRequest detalle = new DetallePedidoRequest(2, 10L);
    PedidoRequest request = new PedidoRequest(List.of(detalle));
    PedidoResponse responseStub = new PedidoResponse(
        1L,
        new Date(),
        "Calle Falsa 123",
        200.0,
        null,
        List.of()
    );

    BDDMockito.given(pedidoService.createPedido(any(PedidoRequest.class))).willReturn(responseStub);

    ResultActions result = mockMvc.perform(
        post("/pedido")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request))
    );

    result.andDo(print())
        .andExpect(status().isCreated())
        .andExpect(header().string("Location", containsString("/pedido/1")))
        .andExpect(jsonPath("$.id").value(1));
    }

}
