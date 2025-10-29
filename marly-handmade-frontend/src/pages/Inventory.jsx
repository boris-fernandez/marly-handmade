import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { useProductos } from "../contexts/ProductoContext.jsx";

function Inventory() {
  const { productos, loading, error } = useProductos(); // ✅ directamente del contexto

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Si el contexto todavía carga, muestra "Loading..."
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Cargando productos...
      </div>
    );
  }

  // ❌ Si hubo error, mostrarlo
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        Error al cargar productos: {error}
      </div>
    );
  }

  // 🧮 Paginación
  const totalPages = Math.ceil((productos?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = productos?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
          marginLeft: "230px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              margin: 0,
              color: "#333",
              fontWeight: "400",
            }}
          >
            Inventory
          </h1>
          <Link to="/admin/product-gallery">
            <button
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Product Gallery
            </button>
          </Link>
        </div>

        {/* Tabla de productos */}
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8f8f8",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <th style={thStyle}>No</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((producto, i) => (
                <tr
                  key={producto.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    backgroundColor: i % 2 === 0 ? "white" : "#fafafa",
                  }}
                >
                  <td style={tdStyle}>{producto.id}</td>
                  <td style={tdStyle}>{producto.name}</td>
                  <td style={tdStyle}>S/ {producto.price.toFixed(2)}</td>
                  <td style={tdStyle}>{producto.stock}</td>
                  <td style={tdStyle}>{producto.category}</td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#666"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={btnPage(currentPage === 1)}
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={btnPage(currentPage === 1)}
          >
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                background: currentPage === page ? "#0066cc" : "white",
                color: currentPage === page ? "white" : "#333",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            style={btnPage(currentPage === totalPages)}
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            style={btnPage(currentPage === totalPages)}
          >
            »
          </button>
        </div>
      </main>
    </div>
  );
}

// 🎨 Estilos compactos
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "500",
  color: "#666",
};

const tdStyle = {
  padding: "15px 12px",
  fontSize: "14px",
  color: "#333",
};

const btnPage = (disabled) => ({
  padding: "8px 12px",
  border: "1px solid #ddd",
  background: "white",
  cursor: disabled ? "not-allowed" : "pointer",
  borderRadius: "4px",
});

export default Inventory;
