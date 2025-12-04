import React, { useEffect, useState } from "react";
import "../styles/Orders.css";
import DataTable from "../components/DataTable.jsx";

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://marlybackend.azurewebsites.net/pedido";

  const fetchPedidos = async () => {
    try {
      const stored = localStorage.getItem("token");
      const parsed = stored ? JSON.parse(stored) : null;
      const tokenValue = parsed?.token || parsed;

      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${tokenValue}` },
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

  const columns = [
    { label: "ID", field: "id", sortable: true },
    { label: "Cliente", field: "cliente", render: (row) => `${row.cliente.nombres} ${row.cliente.apellidos}` },
    { label: "Fecha", field: "fechaPedido", sortable: true, render: (row) => new Date(row.fechaPedido).toLocaleDateString("es-PE") },
    { label: "Dirección", field: "direccionEnvio" },
    { label: "Estado", field: "estado", sortable: true, render: (row) => row.estado ? "Entregado" : "Pendiente" },
    { label: "Productos", field: "detallesPedido", render: (row) => row.detallesPedido.map(d => `${d.nombreProducto} (${d.cantidad} u)`).join(", ") },
    { label: "Total", field: "total", sortable: true, render: (row) => `S/ ${row.total.toFixed(2)}` },
    { 
      label: "Acciones",
      field: "acciones",
      render: (row) => (
        <div className="order-actions">
          <button onClick={() => actualizarEstado(row.id, true)}>Entregado</button>
          <button onClick={() => actualizarEstado(row.id, false)}>Pendiente</button>
        </div>
      )
    }
  ];

  return (
    <main className="orders-container">
      <div className="orders-main">
        <div className="orders-header">
          <h2 className="adm-title">Pedidos Registrados</h2>
        </div>

        {pedidos.length === 0 ? (
          <p className="orders-empty">No hay pedidos registrados.</p>
        ) : (
          <DataTable
            data={pedidos}
            columns={columns}
            searchable={false}
          />
        )}
      </div>
    </main>
  );
};

export default Orders;
