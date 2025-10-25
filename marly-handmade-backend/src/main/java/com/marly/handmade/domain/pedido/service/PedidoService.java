package com.marly.handmade.domain.pedido.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import com.marly.handmade.domain.detallePedido.repository.DetallePedidoRepository;
import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class PedidoService implements IPedidoService{

    private final PedidoRepository pedidoRepository;
    private final DetallePedidoRepository detallePedidoRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;

    public PedidoService(PedidoRepository pedidoRepository, DetallePedidoRepository detallePedidoRepository, ProductoRepository productoRepository, ClienteRepository clienteRepository) {
        this.pedidoRepository = pedidoRepository;
        this.detallePedidoRepository = detallePedidoRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
    }

    private Cliente obtenerCliente(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        Cliente cliente = clienteRepository.findByUsuario_Id(usuario.getId());
        if (cliente == null) throw new RuntimeException("No existe el cliente con ese id");
        return cliente;
    }

    private List<DetallePedido> saveDetallesPedido(List<Producto> productoList, PedidoRequest request, Pedido pedido) {
        return java.util.stream.IntStream.range(0, productoList.size())
                .mapToObj(i -> {
                    DetallePedido detalle = DetallePedido.builder()
                            .cantidad(request.detallePedido().get(i).cantidad())
                            .precioUnitario(productoList.get(i).getPrecio())
                            .pedido(pedido)
                            .producto(productoList.get(i))
                            .build();
                    detallePedidoRepository.save(detalle);
                    return detalle;
                })
                .toList();
    }


    private double totalPedido(List<Producto> productoList, PedidoRequest request){
        double total = 0;
        for (int i = 0; i < productoList.size(); i++) {
            total += productoList.get(i).getPrecio() * request.detallePedido().get(i).cantidad();
        }
        return total;
    }

    private void reducirStockProducto(List<Producto> productoList, PedidoRequest request){
        for (int i = 0; i < productoList.size(); i++) {
            Producto producto = productoList.get(i);
            producto.setStock(producto.getStock() - request.detallePedido().get(i).cantidad());
            productoRepository.save(producto);
        }
    }

    public PedidoResponse createPedido(PedidoRequest request) {
        //Obtener cliente
        Cliente cliente = obtenerCliente();

        //crear fecha de pedido
        Date fechaPedido = new Date();

        //obtener todos lso productos
        List<Producto> productoList = request.detallePedido().stream()
                .map(detallePedidoRequest -> {
                    return productoRepository.findById(detallePedidoRequest.idProducto()).orElseThrow(()-> new RuntimeException("No existe el producto con el id: " + detallePedidoRequest.idProducto()));
                })
                .toList();

        //Obtener total del pedido
        double total = totalPedido(productoList, request);

        //Crear pedido
        Pedido pedido = Pedido.builder()
                .direccionEnvio(cliente.getDireccion())
                .fechaPedido(fechaPedido)
                .cliente(cliente)
                .total(total)
                .estado(false)
                .build();
        pedidoRepository.save(pedido);

        List<DetallePedido> detallePedidos = saveDetallesPedido(productoList, request,pedido);

        //Reducir el stock de producto
        reducirStockProducto(productoList, request);

        return new PedidoResponse(pedido, cliente, detallePedidos);
    }

}
