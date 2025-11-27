package com.marly.handmade.service;

import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<ClienteConUsuarioResponse> listarClientesConRol1() {
        return clienteRepository.listarClientesConRol1();
    }
    //faltacorregir----------------
     public Cliente findByUsername(String username) {
        Cliente cliente = clienteRepository.findByUsuario_Username(username);
        if (cliente == null) throw new RuntimeException("Cliente no encontrado");
        return cliente;
    }
}
