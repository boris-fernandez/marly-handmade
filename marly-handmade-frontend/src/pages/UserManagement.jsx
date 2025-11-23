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
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default UserManagement;
