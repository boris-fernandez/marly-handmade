import React, { useEffect, useState } from "react";
import "../styles/ComplaintsBookAdmin.css";
import { useAdmin } from "../contexts/AdminContext.jsx";
import DataTable from "../components/DataTable.jsx";

const ComplaintsBookAdmin = () => {
  const { users } = useAdmin();
  const [reclamaciones, setReclamaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const normalizar = (s) =>
    s?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

  const getUserFromReclamo = (r) => {
    if (!users) return null;
    const reclamo = normalizar(r.clienteNombre);
    return users.find((u) => {
      const nombre = normalizar(u.nombres);
      const apellido = normalizar(u.apellidos);
      const completo = normalizar(`${u.nombres} ${u.apellidos}`);
      const posibles = [nombre, apellido, completo];
      return posibles.some((p) => reclamo === p || p.includes(reclamo) || reclamo.includes(p));
    });
  };

  useEffect(() => {
    const fetchReclamaciones = async () => {
      try {
        const stored = localStorage.getItem("token");
        const parsed = stored ? JSON.parse(stored) : null;
        const tokenValue = parsed?.token || parsed;

        const response = await fetch("https://marlybackend.azurewebsites.net/reclamaciones", {
          headers: { Authorization: `Bearer ${tokenValue}` },
        });

        if (!response.ok) throw new Error("Error al obtener reclamaciones");
        const data = await response.json();
        setReclamaciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReclamaciones();
  }, []);

  if (loading) return <div className="complaints-loading">Cargando reclamaciones...</div>;
  if (error) return <div className="complaints-error">Error: {error}</div>;

  const columns = [
    { label: "ID Reclamo", field: "id", sortable: true },
    {
      label: "Usuario",
      field: "username",
      render: (row) => getUserFromReclamo(row)?.username ?? "—",
      sortable: true,
    },
    {
      label: "Nombre",
      field: "nombre",
      render: (row) => getUserFromReclamo(row)?.nombres ?? "—",
    },
    {
      label: "Apellido",
      field: "apellido",
      render: (row) => getUserFromReclamo(row)?.apellidos ?? "—",
    },
    { label: "Mensaje", field: "descripcion" },
    {
      label: "Fecha",
      field: "fechaReclamo",
      render: (row) => new Date(row.fechaReclamo).toLocaleString("es-PE"),
      sortable: true,
    },
    {
      label: "Acción",
      field: "accion",
      render: (row) => (
        <button
          className="btn-primary-complaints"
          onClick={() => setSelectedMessage({ ...row, user: getUserFromReclamo(row) })}
        >
          Ver
        </button>
      ),
    },
  ];

  return (
    <main className="complaints-container">
      <div className="complaints-main">
        <h2 className="adm-title">Libro de Reclamaciones</h2>

        <DataTable
          data={reclamaciones}
          columns={columns}
          searchable={false} 
          perPage={8}        
        />

        {selectedMessage && (
          <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Detalle del Reclamo</h3>
              <div className="modal-body">
                {[
                  ["Usuario", selectedMessage.user?.username],
                  ["Nombre Completo", `${selectedMessage.user?.nombres ?? ""} ${selectedMessage.user?.apellidos ?? ""}`],
                  ["Dirección", selectedMessage.user?.direccion],
                  ["Fecha Nacimiento", selectedMessage.user?.fechaNacimiento ? new Date(selectedMessage.user.fechaNacimiento).toLocaleDateString("es-PE") : "—"],
                  ["Identificación", selectedMessage.user?.identificacion],
                  ["Correo", selectedMessage.user?.correo],
                  ["Teléfono", selectedMessage.user?.telefono],
                  ["ID Cliente", selectedMessage.user?.idCliente],
                  ["ID Usuario", selectedMessage.user?.idUsuario],
                  ["Mensaje Reclamo", selectedMessage.descripcion],
                  ["Fecha Reclamo", new Date(selectedMessage.fechaReclamo).toLocaleString("es-PE")],
                ].map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value ?? "—"}
                  </p>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn-close-complaints" onClick={() => setSelectedMessage(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ComplaintsBookAdmin;
