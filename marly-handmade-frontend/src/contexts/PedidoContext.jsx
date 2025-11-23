import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const PedidoContext = createContext();

export function PedidoProviderWrapper({ children }) {
  const { token } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);

  const API_URL = "http://localhost:8080/pedido";

  // ========================
  // 📌 Descargar reporte Excel
  // ========================
  const reportes = async () => {
    try {
      const response = await fetch(`${API_URL}/excel`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al generar el reporte");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_pedidos.xlsx";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el reporte:", error);
    }
  };

  // ========================
  // 📌 Crear pedido (sin estado)
  // ========================
  const crearPedido = async (pedidoData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(pedidoData), // ← solo detallePedido
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al crear pedido: " + errorText);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error creando pedido:", error);
      return null;
    }
  };

  // ========================
  // 📌 Listar pedidos por estado
  // ========================
  const listarPedidoPorestado = async (estadoBooleano) => {
    try {
      const response = await fetch(`${API_URL}/estado/${estadoBooleano}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener pedidos");

      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("❌ Error cargando pedidos:", error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        reportes,
        crearPedido,
        listarPedidoPorestado,
        pedidos,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
