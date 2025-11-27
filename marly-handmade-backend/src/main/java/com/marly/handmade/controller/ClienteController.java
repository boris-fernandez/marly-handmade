package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;
import com.marly.handmade.domain.usuario.modal.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteRepository clienteRepository;

    @GetMapping("/all")
    public List<ClienteConUsuarioResponse> listarClientesRol1() {
        return clienteRepository.listarClientesConRol1();
    }

    //faltacorregir----------------
    @GetMapping("/me")
    public ResponseEntity<?> obtenerMiPerfil(@AuthenticationPrincipal Usuario user) {

        Cliente cliente = clienteRepository.findByUsuario_Id(user.getId());

        if (cliente == null) {
            return ResponseEntity.status(404).body("Cliente no encontrado");
        }

        return ResponseEntity.ok(cliente);
    }
}

