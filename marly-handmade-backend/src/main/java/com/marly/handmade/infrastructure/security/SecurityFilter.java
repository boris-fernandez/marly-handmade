package com.marly.handmade.infrastructure.security;

import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;

    public SecurityFilter(TokenService tokenService, UsuarioRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        log.info("Request URL: {}", request.getRequestURI());

        var authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.replace("Bearer ", "");
            String nombreUsuario = null;

            try {

                nombreUsuario = tokenService.getSubject(token);
                
                if (nombreUsuario != null) {
                    log.info("Token validado exitosamente para usuario: {}", nombreUsuario);

                    Usuario usuario = usuarioRepository.findByUsername(nombreUsuario);
                    if (usuario != null) {
                        var autenticacion = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(autenticacion);
                    } else {
                        log.warn("Usuario no encontrado en DB, a pesar de token válido: {}", nombreUsuario);
                    }
                }
            } catch (RuntimeException e) {

                log.error("Falla de Validación de JWT (403): {}", e.getMessage()); 

            }
        }
        
        filterChain.doFilter(request, response);
    }
}