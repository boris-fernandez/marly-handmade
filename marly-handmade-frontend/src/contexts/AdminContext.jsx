// AdminContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
  setLoading(true);
  setError(null);

  console.log("🚀 Iniciando fetch de usuarios...");

  try {
    const response = await fetch("http://localhost:8080/clientes/all");
    console.log("📥 Response recibida:", response);

    if (!response.ok) {
      console.error("❌ Response no OK:", response.status, response.statusText);
      throw new Error("Error al cargar los usuarios");
    }

    // Aquí podemos ver el texto crudo antes de parsear
    const text = await response.text();
    console.log("📝 Texto recibido del servidor:", text);

    // Intentamos parsear JSON
    const data = JSON.parse(text);
    console.log("✅ Datos parseados:", data);

    const transformed = data.map((user) => ({
      id: user.idCliente,
      username: user.username,
      name: `${user.nombres} ${user.apellidos}`,
      email: user.correo,
      registered: new Date(user.fechaNacimiento).toLocaleDateString("es-PE"),
    }));

    setUsers(transformed);
  } catch (err) {
    console.error("💥 Error en fetchUsers:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminContext.Provider value={{ users, loading, error, fetchUsers }}>
      {children}
    </AdminContext.Provider>
  );
};
