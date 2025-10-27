package com.marly.handmade.domain.usuario.repository;

import com.marly.handmade.domain.usuario.data.responst.UsuarioClienteResponse;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("""
        SELECT new com.marly.handmade.domain.usuario.data.response.UsuarioClienteResponse(
            u.id,
            u.username,
            u.rol,
            u.estado,
            c.nombres,
            c.apellidos,
            c.correo
        )
        FROM Usuario u
        JOIN Cliente c ON c.usuario.id = u.id
    """)
    List<UsuarioClienteResponse> listarUsuariosConClientes();

}
