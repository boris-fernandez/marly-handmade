export default function ProfilePaymentMethods() {
  return (
        <div>
      <h3 className="text-xl font-semibold mb-4">Tarjetas de crédito</h3>

      <p className="text-gray-600 mb-6">
        Administra tus tarjetas guardadas para realizar compras más rápido.
      </p>

      {/* Lista de tarjetas */}
      <div className="space-y-4">

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="font-semibold">**** **** **** 4582</p>
          <p className="text-sm text-gray-500">Vencimiento: 04/26</p>
          <button className="mt-2 text-red-600 hover:underline text-sm">
            Eliminar tarjeta
          </button>
        </div>

      </div>

      {/* Botón para agregar tarjeta */}
      {/* <button className="mt-6 bg-[#1B2A40] text-[#F5E3C3] px-4 py-2 rounded-md hover:opacity-90">
        Agregar nueva tarjeta
      </button> */}
    </div>
  );
}