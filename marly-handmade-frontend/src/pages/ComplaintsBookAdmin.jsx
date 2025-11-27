import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import "../styles/ComplaintsBookAdmin.css";
import { useAdmin } from "../contexts/AdminContext.jsx";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const API_URL = "http://localhost:8080/reclamaciones";

  useEffect(() => {
    const fetchReclamaciones = async () => {
      try {
        const stored = localStorage.getItem("token");
        const parsed = stored ? JSON.parse(stored) : null;
        const tokenValue = parsed?.token || parsed;

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
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

  // 🔹 Calcular paginación
  const totalPages = Math.ceil(reclamaciones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReclamaciones = reclamaciones.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="complaints-container">
      <div className="complaints-main">
        <div className="complaints-header">
          <h2 className="complaints-title">Libro de Reclamaciones</h2>
        </div>

        {reclamaciones.length === 0 ? (
          <p className="complaints-empty">No hay reclamaciones registradas.</p>
        ) : (
          <div className="complaints-table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>ID Reclamo</th>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentReclamaciones.map((r, index) => {
                  const user = getUserFromReclamo(r);
                  return (
                    <tr key={r.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                      <td>{r.id}</td>
                      <td>{user?.username ?? "—"}</td>
                      <td>{user?.nombres ?? "—"}</td>
                      <td>{user?.apellidos ?? "—"}</td>
                      <td className="truncate">{r.descripcion}</td>
                      <td>{new Date(r.fechaReclamo).toLocaleString("es-PE")}</td>
                      <td>
                        <button
                          className="btn-primary-complaints"
                          onClick={() => setSelectedMessage({ ...r, user })}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* 🔹 Paginación */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {selectedMessage && (
          <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Detalle del Reclamo</h3>
              <div className="modal-body">
                {[
                  ["Usuario", selectedMessage.user?.username],
                  ["Nombre Completo", `${selectedMessage.user?.nombres ?? ""} ${selectedMessage.user?.apellidos ?? ""}`],
                  ["Dirección", selectedMessage.user?.direccion],
                  ["Fecha Nacimiento", formatearFecha(selectedMessage.user?.fechaNacimiento)],
                  ["Identificación", selectedMessage.user?.identificacion],
                  //["Puntos Fidelización", selectedMessage.user?.puntosFidelizacion],
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
                <button
                  className="btn-close-complaints"
                  onClick={() => setSelectedMessage(null)}
                >
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
