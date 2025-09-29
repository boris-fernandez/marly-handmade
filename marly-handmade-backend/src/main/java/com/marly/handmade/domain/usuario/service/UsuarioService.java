package com.marly.handmade.domain.usuario.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public RespuestaRegistro registrar(RegistrarUsuario registrarUsuario) {
        if (usuarioRepository.existsByUsername(registrarUsuario.username())) {
            throw new IllegalArgumentException("El username ya está en uso");
        }
        if (clienteRepository.existsByCorreo(registrarUsuario.cliente().correo())) {
            throw new IllegalArgumentException("El correo ya está en uso");
        }

        Usuario usuario = Usuario.builder()
                .username(registrarUsuario.username())
                .password(passwordEncoder.encode(registrarUsuario.password()))
                .rol(Rol.Cliente)
                .estado(true)
                .build();
        Cliente cliente = Cliente.builder()
                .nombres(registrarUsuario.cliente().nombres())
                .apellidos(registrarUsuario.cliente().apellidos())
                .direccion(registrarUsuario.cliente().direccion())
                .fechaNacimiento(registrarUsuario.cliente().fechaNacimiento())
                .identificacion(registrarUsuario.cliente().identificacion())
                .correo(registrarUsuario.cliente().correo())
                .telefono(registrarUsuario.cliente().telefono())
                .usuario(usuario)
                .build();

        usuarioRepository.save(usuario);
        clienteRepository.save(cliente);

        return new RespuestaRegistro(usuario.getId(), usuario.getUsername(), cliente.getCorreo());
    }

}
