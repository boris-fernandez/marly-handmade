import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

import "../styles/Inventory.css";

const getInventoryData = async () => {
  const response = await fetch("http://localhost:8080/producto/all");
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
};

function Inventory() {
  const { productos, loading, error } = useProductos(); // ✅ directamente del contexto

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    getInventoryData()
      .then(setInventory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredInventory = inventory
    .filter((item) => {
      const matchesName = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || item.categoria === selectedCategory;
      return matchesName && matchesCategory;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
    });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div className="loading">Loading...</div>;
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
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        

        <main className="inventory-main">
          <div className="inventory-header">
            <h1>Inventory</h1>
            <Link to="/admin/product-gallery">
              <button className="gallery-button">Product Gallery</button>
            </Link>
          </div>

          <div className="filter-panel">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {["Todos", ...new Set(inventory.map((item) => item.categoria))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>

              ))}
            </select>

            <div className="sort-combo">
              <label>Ordenar por:</label>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="id">ID</option>
                <option value="nombre">Nombre</option>
                <option value="precio">Precio</option>
                <option value="stock">Stock</option>
              </select>
              <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Detalles</th>
                  <th>Advertencia</th>
                  <th>Envío</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, i) => (
                  <tr key={item.id} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td className="price-cell">S/ {item.precio.toFixed(2)}</td>
                    <td>{item.categoria}</td>
                    <td>{item.details}</td>
                    <td>{item.care}</td>
                    <td>{item.shipping_info}</td>
                    <td>{item.stock}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-editar">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className="btn-eliminar">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>‹</button>
            {[...Array(totalPages).keys()].map((page) => (
              <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={currentPage === page + 1 ? "active" : ""}>
                {page + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
          </div>
        </main>
      </div>
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
