import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function PerfilForm() {
  const { user, token } = useContext(AuthContext);

  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await fetch("https://marlybackend.azurewebsites.net/clientes/me", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });

        if (!response.ok) {
          console.log("Error en backend:", response.status);
          return;
        }

        const data = await response.json();
        setCliente(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, [user]);

  if (!cliente) return <p>Cargando datos...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Mi perfil</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Nombres</label>
          <input
            className="w-full border p-2 rounded"
            value={cliente.nombres}
            disabled
          />
        </div>

        <div>
          <label>Apellidos</label>
          <input
            className="w-full border p-2 rounded"
            value={cliente.apellidos}
            disabled
          />
        </div>

        <div>
          <label>Documento de identidad</label>
          <input
            className="w-full border p-2 rounded"
            value={cliente.identificacion}
            disabled
          />
        </div>

        <div>
          <label>Celular</label>
          <input
            className="w-full border p-2 rounded"
            value={cliente.telefono}
            disabled
          />
        </div>

        <div>
          <label>Correo electrónico</label>
          <input
            className="w-full border p-2 rounded bg-gray-100"
            value={cliente.correo}
            disabled
          />
        </div>
      </div>

      {/* <button className="bg-[#1B2A40] text-[#F5E3C3] px-4 py-2 rounded mt-6">
        Editar información
      </button> */}
    </div>
  );
}
