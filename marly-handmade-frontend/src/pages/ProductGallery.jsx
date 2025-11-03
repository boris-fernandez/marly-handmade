import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductGallery.css";
import FiltersBar from "../components/FiltersBar";

const getProductsData = async () => {
  const response = await fetch("http://localhost:8080/producto/all");
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
};

function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    getProductsData()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((p) => p.categoria === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
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
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortField, sortDirection, products]);

  const uniqueCategories = ["Todos", ...new Set(products.map((p) => p.categoria))];

  if (loading) {
    return <div className="gallery-loading">Cargando productos...</div>;
  }

  return (
    <div className="gallery-container">
      <main className="gallery-main">
        <div className="gallery-header">
          <h1 className="gallery-title">Product Gallery</h1>
          <Link to="/admin/inventory">
            <button className="gallery-button">Inventory</button>
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

        <div className="gallery-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="gallery-card">
              {[product.fotoPrincipal, product.fotoSecundario, product.fotoTerciario].map((img, index) =>
                img ? (
                  <img
                    key={index}
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="gallery-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.insertAdjacentHTML("afterend", `<div class='gallery-placeholder'>Sin imagen</div>`);
                    }}
                  />
                ) : (
                  <div key={index} className="gallery-placeholder">Sin imagen</div>
                )
              )}

              <h3 className="gallery-name">{product.nombre}</h3>
              <p className="gallery-description">{product.descripcion}</p>
              <p className="gallery-price">S/ {product.precio.toFixed(2)}</p>
              <p className="gallery-category"><strong>Categoría:</strong> {product.categoria}</p>

              <div className="gallery-footer">
                <span className={`gallery-stock ${product.stock <= 10 ? "low" : "ok"}`}>
                  {product.stock <= 10 ? ` ⚠ ${product.stock} en stock` : `✓ ${product.stock} en stock`}
                </span>
                <div className="gallery-actions">
                  <Link to={`/admin/inventory/edit/${product.id}`} className="gallery-edit-button">
                    Editar
                  </Link>
                  <button onClick={() => alert(`Editar producto: ${product.nombre}`)} className="gallery-edit-button" > Eliminar </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGallery;
