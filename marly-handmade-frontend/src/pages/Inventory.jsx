import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../contexts/ProductoContext.jsx";
import DataTable from "../components/DataTable.jsx";
import DeleteProduct from "../components/DeleteProduct.jsx";

function Inventory() {
  const { productos, error, loading } = useProductos();

  const [localData, setLocalData] = useState([]);
  const fetchProductos = async () => {
  const res = await fetch("/api/productos");
  const data = await res.json();
  setProductos(data);
};

  useEffect(() => {
    if (productos.length > 0) {
      const activos = productos.filter((p) => p.status == 1);
      setLocalData(activos);
    }
  }, [productos]);

  const handleDeleteFront = (id) => {
    setLocalData((prev) => prev.filter((p) => p.id !== id));
  };

  const columns = [
    { label: "ID", field: "id", sortable: true },
    { label: "Nombre", field: "name", sortable: true },
    { label: "Descripción", field: "description" },
    {
      label: "Precio",
      field: "price",
      sortable: true,
      className: "col-price",
      render: (row) => `S/${Number(row.price).toFixed(2)}`
    },
    { label: "Categoría", field: "category", sortable: true },
    { label: "Detalles", field: "details" },
    { label: "Cuidado", field: "care" },
    { label: "Envío", field: "shippingInfo" },
    { label: "Stock", field: "stock", sortable: true },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <h1 className="adm-title">Inventory</h1>

        <DataTable
          data={localData}
          columns={columns}
          searchable={true}
          actions={(row) => (
            <div className="action-buttons">
              <Link
                to={`/admin/inventory/edit/${row.id}`}
                className="btn-editar"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>

              <DeleteProduct
                id={row.id}
                name={row.name}
                onDelete={handleDeleteFront}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default Inventory;
