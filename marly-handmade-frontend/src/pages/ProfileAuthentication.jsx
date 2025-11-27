export default function ProfileAuthentication() {
  return (
     <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">

      <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
      <p className="text-gray-600 mb-6">
        Por seguridad, te recomendamos usar una contraseña fuerte y única.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Nueva contraseña</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2"
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirmar nueva contraseña</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2"
            placeholder="Repite tu nueva contraseña"
          />
        </div>

      </div>

      <button
        className="mt-6 bg-[#1B2A40] text-[#F5E3C3] px-5 py-2 rounded-lg hover:bg-[#25395A] transition"
      >
        Guardar nueva contraseña
      </button>
    </div>
  );
}