export default function ProfileAddresses() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Mis direcciones</h3>

      {/* Lista de direcciones guardadas */}
      <div className="space-y-4">

        {/* EJEMPLO DE UNA DIRECCIÓN */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <p><strong>Casa:</strong> Av. Los Olivos 123</p>
          <p>Lima, Perú</p>
          <p>Referencia: Frente al parque</p>

          <div className="flex gap-3 mt-3">
            <button className="px-4 py-1 bg-[#1B2A40] text-[#F5E3C3] rounded">
              Editar
            </button>
            <button className="px-4 py-1 bg-red-600 text-white rounded">
              Eliminar
            </button>
          </div>
        </div>

      </div>

      {/* Botón para agregar nueva dirección */}
      <button className="mt-6 bg-[#1B2A40] text-[#F5E3C3] px-4 py-2 rounded-lg">
        Agregar nueva dirección +
      </button>
    </div>
  );
}