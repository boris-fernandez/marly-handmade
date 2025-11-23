import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../contexts/ProductoContext.jsx";
import Pagination from "../components/Pagination.jsx";
import FiltersBar from "../components/FiltersBar";

import "../styles/Inventory.css";

function Inventory() {
  const { productos, error, loading } = useProductos();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredProducts = productos
    .filter((item) => {
      const matchesName = item.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || item.category === selectedCategory;
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
  const uniqueCategories = ["Todos", ...new Set(productos.map((p) => p.category))];

  // 🧮 Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ⏳ Loading y errores
  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error)
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

  return (
    <div className="admin-layout">


      <div className="admin-content">
        <main className="inventory-main">
          <div className="inv-section-header">
            <h1 className="inv-title">Inventario</h1>
            <Link to="/admin/product-gallery">
              <button className="gallery-button">Product Gallery</button>
            </Link>
          </div>
          <FiltersBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            uniqueCategories={uniqueCategories}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
          />


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
                  <th>Cuidado</th>
                  <th>Envío</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, i) => (
                  <tr
                    key={item.id}
                    className={i % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td className="price-cell">
                      S/{" "}
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "0.00"}
                    </td>
                    <td>{item.category}</td>
                    <td>{item.details}</td>
                    <td>{item.care}</td>
                    <td>{item.shippingInfo}</td>
                    <td>{item.stock}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/admin/inventory/edit/${item.id}`} className="btn-editar">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}

export default Inventory;
