import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function DeleteProduct({ id, name, onDelete }) {
  const { token } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;

    const response = await fetch(`https://marlybackend.azurewebsites.net/producto/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token.token}` },
    });

    if (!response.ok) {
      alert("Error al eliminar");
      return;
    }

   
    onDelete(id);

    alert(`"${name}" eliminado correctamente`);
  };

  return (
    <button onClick={handleDelete} className="btn-eliminar">
      <i className="fa-solid fa-trash"></i>
    </button>
  );
}

export default DeleteProduct;
