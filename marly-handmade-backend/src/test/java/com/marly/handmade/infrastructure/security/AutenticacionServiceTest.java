package com.marly.handmade.infrastructure.security;

import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AutenticacionServiceTest {

    private UsuarioRepository usuarioRepository;
    private AutenticacionService autenticacionService;

    @BeforeEach
    void setup() {
        usuarioRepository = Mockito.mock(UsuarioRepository.class);
        autenticacionService = new AutenticacionService(usuarioRepository);
    }

    @Test
    void loadUserByUsername_found() {
        Usuario u = new Usuario();
        u.setUsername("juan");
        BDDMockito.given(usuarioRepository.findByUsername("juan")).willReturn(u);

        UserDetails ud = autenticacionService.loadUserByUsername("juan");
        assertThat(ud).isNotNull();
        assertThat(ud.getUsername()).isEqualTo("juan");
    }

    @Test
    void loadUserByUsername_notFound_throws() {
        BDDMockito.given(usuarioRepository.findByUsername("noexiste")).willReturn(null);
        assertThrows(UsernameNotFoundException.class, () -> autenticacionService.loadUserByUsername("noexiste"));
    }
}
