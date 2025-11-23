import React, { useState, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/UserManagement.css";

function UserManagement() {
  const { users, loading, error } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log(" Datos desde backend:", users);
  }, [users]);

  if (loading) return <div className="loading">Cargando clientes...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!users?.length) return <div className="no-users">No hay datos de clientes</div>;

  //  Filtrado simple por texto
  const filteredUsers = users.filter((u) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      u.nombres?.toLowerCase().includes(q) ||
      u.apellidos?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      u.correo?.toLowerCase().includes(q) ||
      u.identificacion?.toLowerCase().includes(q)
    );
  });

  //  Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  //  Formato de fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return "—";

    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    }

    const soloFecha = fecha.split("T")[0];
    const [year, month, day] = soloFecha.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="user-management">
      <main className="main-content">
        <div className="section-header">
          <h1 className="user-title">User Management</h1>
        </div>

        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                {[
                  "No",
                  "Usuario",
                  "Nombre Completo",
                  "Dirección",
                  "Fecha Nacimiento",
                  "Identificación",
                  "Puntos Fidelización",
                  "Correo",
                  "Teléfono",
                  "ID Cliente",
                  "ID Usuario",
                  "Acciones",
                ].map((th) => (
                  <th key={th}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="12" className="no-users">
                    No hay clientes
                  </td>
                </tr>
              ) : (
                currentUsers.map((u, i) => (
                  <tr
                    key={u.idCliente ?? i}
                    className={i % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{startIndex + i + 1}</td>
                    <td>{u.username}</td>
                    <td>{u.nombres} {u.apellidos}</td>
                    <td>{u.direccion}</td>
                    <td>{formatearFecha(u.fechaNacimiento)}</td>
                    <td>{u.identificacion}</td>
                    <td>{u.puntosFidelizacion}</td>
                    <td>{u.correo}</td>
                    <td>{u.telefono}</td>
                    <td>{u.idCliente}</td>
                    <td>{u.idUsuario}</td>
                    <td>
                      <button
                        className="btn-primary-users"
                        onClick={() => setSelectedUser(u)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="modal-title">Detalle del Cliente</h2>
              <div className="modal-body">
                {[
                  ["Usuario", selectedUser.username],
                  ["Nombre Completo", `${selectedUser.nombres} ${selectedUser.apellidos}`],
                  ["Dirección", selectedUser.direccion],
                  ["Fecha Nacimiento", formatearFecha(selectedUser.fechaNacimiento)],
                  ["Identificación", selectedUser.identificacion],
                  ["Puntos Fidelización", selectedUser.puntosFidelizacion],
                  ["Correo", selectedUser.correo],
                  ["Teléfono", selectedUser.telefono],
                  ["ID Cliente", selectedUser.idCliente],
                  ["ID Usuario", selectedUser.idUsuario],
                ].map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value}
                  </p>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  className="btn-primary close-btn"
                  onClick={() => setSelectedUser(null)}
                >
                  Cerrar
                </button>
              </div>


                  /*
          <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "white" }}>
            <h2 style={{ marginBottom: "15px", color: "#333" }}>Detalle de {selectedUser.name}</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Registrado:</strong> {selectedUser.registered}</p>
              */

            /*{ /<h3 style={{ marginTop: "20px" }}>Historial de Compras</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f8f8f8", borderBottom: "2px solid #e0e0e0" }}>
                  <tr>
                    {["Código", "Fecha", "Producto", "Categoría", "Precio", "Método", "Estado"].map((th) => (
                      <th key={th} style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#666" }}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getPurchaseHistory().map((purchase) => (
                    <tr key={purchase.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.code}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.date}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.product}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.category}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>S/ {purchase.price.toFixed(2)}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.method}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> }*/
/*
            <button style={{ marginTop: "20px", backgroundColor: "#997C71", color: "#F5E3C3", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setSelectedUser(null)}>
              Cerrar
            </button>*/
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default UserManagement;
