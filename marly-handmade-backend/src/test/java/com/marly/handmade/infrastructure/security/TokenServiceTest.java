package com.marly.handmade.infrastructure.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class TokenServiceTest {

    private TokenService tokenService;

    @BeforeEach
    void setup() throws Exception {
        tokenService = new TokenService();
        // inyectar secreto para pruebas
        Field f = TokenService.class.getDeclaredField("apiSecret");
        f.setAccessible(true);
        f.set(tokenService, "test-secret-1234567890");
    }

    @Test
    void generarYVerificarToken_subjectCorrecto() {
        Usuario u = new Usuario();
        u.setId(5L);
        u.setUsername("pepito");
        u.setRol(Rol.CLIENTE);

        String token = tokenService.generarToken(u);
        assertThat(token).isNotNull();

        String subject = tokenService.getSubject(token);
        assertThat(subject).isEqualTo("pepito");

        DecodedJWT decoded = tokenService.verifyToken(token);
        assertThat(decoded.getClaim("id").asLong()).isEqualTo(5L);
        assertThat(decoded.getClaim("rol").asString()).isEqualTo("CLIENTE");
    }

    @Test
    void generarTokenResetPassword_noLanzaExcepcionYTieneTipoClaim() {
        Usuario u = new Usuario();
        u.setId(7L);
        u.setUsername("maria");
        u.setRol(Rol.ADMIN);

        assertDoesNotThrow(() -> {
            String token = tokenService.generarTokenResetPassword(u);
            DecodedJWT decoded = tokenService.verifyToken(token);
            assertThat(decoded.getClaim("tipo").asString()).isEqualTo("reset-password");
        });
    }
}
