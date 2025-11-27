package com.marly.handmade.domain.cliente.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByCorreo(String correo);

    @Query("SELECT c.id FROM Cliente c WHERE c.correo = :correo")
    Long idClientefindByCorreo(String correo);

    Cliente findByCorreo(String correo);

    Cliente findByUsuario_Id(Long id);

    boolean existsByIdentificacion(String identificacion);

    Cliente findByUsuario_Username(String username);

    @Query(value = """
                SELECT
        c.id_cliente AS idCliente,
        u.username AS username,
        c.nombres AS nombres,
        c.apellidos AS apellidos,
        c.direccion AS direccion,
        c.fecha_nacimiento AS fechaNacimiento,
        c.identificacion AS identificacion,
        c.puntos_fidelizacion AS puntosFidelizacion,
        c.correo AS correo,
        c.telefono AS telefono,
        u.id_usuario AS idUsuario
    FROM clientes c
    INNER JOIN usuarios u ON u.id_usuario = c.id_usuario
    WHERE u.rol = 1
    """, nativeQuery = true)
    List<ClienteConUsuarioResponse> listarClientesConRol1();

}
