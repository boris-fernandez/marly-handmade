import React, { useEffect, useState } from "react";
import "../styles/Orders.css";
import Pagination from "../components/Pagination.jsx";

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080/pedido";

  const fetchPedidos = async () => {
    try {
      const stored = localStorage.getItem("token");
      const parsed = stored ? JSON.parse(stored) : null;
      const tokenValue = parsed?.token || parsed;

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener pedidos");
      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPedidos();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(pedidos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pedidos.slice(startIndex, startIndex + itemsPerPage);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const stored = localStorage.getItem("token");
      const parsed = stored ? JSON.parse(stored) : null;
      const tokenValue = parsed?.token || parsed;

      const response = await fetch(`${API_URL}/${id}/estado`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!response.ok) throw new Error("Error al actualizar estado");

      // Actualiza el estado local
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado: nuevoEstado } : p
        )
      );
    } catch (err) {
      alert("No se pudo actualizar el estado: " + err.message);
    }
  };

  if (loading) return <div className="orders-loading">Cargando pedidos...</div>;
  if (error) return <div className="orders-error">Error: {error}</div>;

  return (
    <main className="orders-container">
      <div className="orders-main">
        <div className="orders-header">
          <h2 className="orders-title">Pedidos Registrados</h2>
        </div>

        {pedidos.length === 0 ? (
          <p className="orders-empty">No hay pedidos registrados.</p>
        ) : (
          <>
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Dirección</th>
                    <th>Estado</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p, index) => {
                    const productosTexto = p.detallesPedido
                      .map((d) => `${d.nombreProducto} (${d.cantidad} u)`)
                      .join(", ");


                    return (
                      <tr key={p.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                        <td>{p.id}</td>
                        <td>{p.cliente.nombres} {p.cliente.apellidos}</td>
                        <td>{new Date(p.fechaPedido).toLocaleDateString("es-PE")}</td>
                        <td>{p.direccionEnvio}</td>
                        <td className={`estado-cell ${p.estado ? "estado-entregado" : "estado-pendiente"}`}>
                          {p.estado ? "Entregado" : "Pendiente"}
                        </td>

                        <td>{productosTexto}</td>
                        <td>S/ {p.total.toFixed(2)}</td>
                        <td>
                          <div className="order-actions">
                            <button onClick={() => actualizarEstado(p.id, true)}>Entregado</button>
                            <button onClick={() => actualizarEstado(p.id, false)}>Pendiente</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

      </div>
    </main>
  );
};

export default Orders;
