import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function ProfileAddresses() {
  
  const { user, token } = useContext(AuthContext);

  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await fetch("http://localhost:8080/clientes/me", {
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

  // const eliminarDireccion = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:8080/clientes/direcciones/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Authorization": `Bearer ${token.token}`
  //       }
  //     });

  //     if (res.ok) {
  //       setDirecciones(direcciones.filter(dir => dir.id !== id));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if (loading) return <p>Cargando direcciones...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Mis direcciones</h3>

      {/* Lista de direcciones guardadas */}
      <div className="space-y-4">

        {/* EJEMPLO DE UNA DIRECCIÓN */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <p><strong>Casa:</strong> </p>
          <p>{cliente.direccion}</p>
          {/* <p>Referencia: Frente al parque</p> */}

          {/* <div className="flex gap-3 mt-3">
            <button className="px-4 py-1 bg-[#1B2A40] text-[#F5E3C3] rounded">
              Editar
            </button>
            <button className="px-4 py-1 bg-red-600 text-white rounded">
              Eliminar
            </button>
          </div> */}
        </div>

      </div>

      {/* Botón para agregar nueva dirección */}
      {/* <button className="mt-6 bg-[#1B2A40] text-[#F5E3C3] px-4 py-2 rounded-lg">
        Agregar nueva dirección +
      </button> */}
    </div>
  );
}
