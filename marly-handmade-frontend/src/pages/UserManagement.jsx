import React, { useState, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext.jsx";
import DataTable from "../components/DataTable.jsx"; 
import "../styles/UserManagement.css";

function UserManagement() {
  const { users, loading, error } = useAdmin();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log("Datos desde backend:", users);
  }, [users]);

  if (loading) return <div className="loading">Cargando clientes...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!users?.length) return <div className="no-users">No hay datos de clientes</div>;

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    const soloFecha = fecha.split("T")[0];
    const [year, month, day] = soloFecha.split("-");
    return `${day}/${month}/${year}`;
  };

  
  const columns = [
    {
      label: "Nro",
      field: "nro",
      sortable: false,
      render: (_, index, globalIndex) => globalIndex + 1,
      className: "col-nro"
    },
    { label: "Usuario", field: "username", sortable: true },
    {
      label: "Nombre Completo",
      field: "nombreCompleto",
      sortable: true,
      render: (row) => `${row.nombres} ${row.apellidos}`
    },
    { label: "Dirección", field: "direccion", sortable: false },
    {
      label: "Fecha Nacimiento",
      field: "fechaNacimiento",
      sortable: true,
      render: (row) => formatearFecha(row.fechaNacimiento)
    },
    { label: "Identificación", field: "identificacion", sortable: true },
    { label: "Correo", field: "correo", sortable: true },
    { label: "Teléfono", field: "telefono", sortable: false },
    { label: "ID Cliente", field: "idCliente", sortable: true },
    { label: "ID Usuario", field: "idUsuario", sortable: true },
  ];

  
  const actions = (row) => (
    <button
      className="btn-primary-users"
      onClick={() => setSelectedUser(row)}
    >
      Ver
    </button>
  );

  return (
    <div className="user-management">
      <main className="main-content">
        <div className="section-header">
          <h1 className="adm-title">User Management</h1>
        </div>

        <DataTable
          data={users}
          columns={columns}
          actions={actions}
          searchable={true}
          itemsPerPage={10}
        />

        
        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detalle del Cliente</h2>
              <div className="modal-body">
                {[
                  ["Usuario", selectedUser.username],
                  ["Nombre Completo", `${selectedUser.nombres} ${selectedUser.apellidos}`],
                  ["Dirección", selectedUser.direccion],
                  ["Fecha Nacimiento", formatearFecha(selectedUser.fechaNacimiento)],
                  ["Identificación", selectedUser.identificacion],
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
