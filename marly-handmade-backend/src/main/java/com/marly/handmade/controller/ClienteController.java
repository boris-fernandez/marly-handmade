package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.dto.ClienteUsuarioDTO;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;
import com.marly.handmade.domain.usuario.modal.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
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

    // faltacorregir----------------
    @GetMapping("/me")
    public ResponseEntity<?> obtenerMiPerfil(@AuthenticationPrincipal Usuario user) {

        // Buscar cliente por el id del usuario
        Cliente cliente = clienteRepository.findByUsuario_Id(user.getId());

        if (cliente == null) {
            return ResponseEntity.status(404).body("Cliente no encontrado");
        }

        // Construir DTO
        ClienteUsuarioDTO response = new ClienteUsuarioDTO(
                cliente.getId(), // tu campo id en Cliente
                user.getId(), // id del usuario
                user.getUsername(), // username del usuario
                cliente.getNombres(),
                cliente.getApellidos(),
                cliente.getDireccion(),
                cliente.getFechaNacimiento() != null
                        ? cliente.getFechaNacimiento().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
                        : null,
                cliente.getIdentificacion(),
                cliente.getPuntosFidelizacion(),
                cliente.getCorreo(),
                cliente.getTelefono());

        return ResponseEntity.ok(response);
    }

}
