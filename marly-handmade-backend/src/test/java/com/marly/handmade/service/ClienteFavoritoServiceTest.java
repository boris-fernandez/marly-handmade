package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavorito;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavoritoId;
import com.marly.handmade.domain.clienteFavorito.repository.ClienteFavoritoRepository;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ClienteFavoritoServiceTest {

    private ClienteFavoritoRepository clienteFavoritoRepository;
    private ProductoRepository productoRepository;
    private ClienteRepository clienteRepository;
    private ClienteFavoritoService service;

    @BeforeEach
    void setup() {
        clienteFavoritoRepository = Mockito.mock(ClienteFavoritoRepository.class);
        productoRepository = Mockito.mock(ProductoRepository.class);
        clienteRepository = Mockito.mock(ClienteRepository.class);
        service = new ClienteFavoritoService(clienteFavoritoRepository, productoRepository, clienteRepository);
    }

    @Test
    void listarFavoritosPorIdCliente_found() {
        Cliente c = Cliente.builder().id(3L).build();
        ClienteFavorito f = ClienteFavorito.builder().id(new ClienteFavoritoId(3L, 10L)).cliente(c).producto(Producto.builder().idProducto(10L).build()).build();

        BDDMockito.given(clienteRepository.findById(3L)).willReturn(Optional.of(c));
        BDDMockito.given(clienteFavoritoRepository.findByCliente(c)).willReturn(List.of(f));

        List<ClienteFavorito> res = service.listarFavoritosPorIdCliente(3L);
        assertThat(res).hasSize(1);
        assertThat(res.get(0).getId().getIdCliente()).isEqualTo(3L);
    }

    @Test
    void listarFavoritosPorIdCliente_notFound_throws() {
        BDDMockito.given(clienteRepository.findById(99L)).willReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.listarFavoritosPorIdCliente(99L));
    }
}
