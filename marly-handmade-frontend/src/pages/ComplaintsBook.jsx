import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReclamaciones } from "../contexts/ReclamacionesContext";

function ComplaintsBook() {
  const { crearReclamacion, loading } = useReclamaciones();
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const maxChars = 250;

    useEffect(() => {
  const ahora = new Date();
  const fechaHoy = ahora.toISOString().split("T")[0]; 
  const horaHoy = ahora.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  setFecha(`${fechaHoy} ${horaHoy}`);
}, []);
  
  const handleSubmit = async () => {
    try {
      await crearReclamacion({ fecha, descripcion });
      alert("Reclamación enviada con éxito");
      setDescripcion("");
    } catch (err) {
      alert("Error al enviar la reclamación");
    }
  };

  return (
    <>
      <Header />

      <h2 className="text-3xl font-bold mb-8 text-center mt-10">
        COMPLAINTS BOOK
      </h2>

      <div className="my-10 flex flex-col gap-6 w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        <div>
          <h3 className="text-xl font-semibold text-[#1B2A40] border-b border-gray-300 pb-2 mb-4">
            DATOS GENERALES
          </h3>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Fecha del reclamo:</span> {fecha}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Razón social:</span> Marly Handmade
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Dirección:</span> Av. de la Marina 2000, San Miguel 15035
          </p>
        </div>

        <div className="w-full">
          <label className="block font-semibold mb-2">
            PLEASE DESCRIBE THE PROBLEM
          </label>
          <textarea
            rows={6}
            placeholder="Describe the issue in detail..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={maxChars}
            className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-sm text-gray-500 text-right mt-1">
            {maxChars - descripcion.length} caracteres restantes
          </p>
        </div>

        <button
          className="bg-[#1B2A40] text-[#ffffff] px-6 py-2 rounded-lg shadow-md hover:bg-[#162030] transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={loading || !descripcion.trim()}
        >
          {loading ? "Enviando..." : "Enviar Reclamo"}
        </button>
      </div>

      <Footer />
    </>
  );
}

export default ComplaintsBook;
