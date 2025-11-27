export default function ProfileRecord() {
const compras = [
    {
      id: 1,
      codigo: "A123XZ",
      fecha: "12/11/2025",
      nombre: "Zapatillas Urbanas",
      precio: 199.90,
      imagen: "/img/producto1.jpg", 
      estrellas: 4
    },
    {
      id: 2,
      codigo: "B882KM",
      fecha: "03/10/2025",
      nombre: "Polera Oversize",
      precio: 89.90,
      imagen: "/img/producto2.jpg",
      estrellas: 5
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Historial de compras</h2>

      {compras.map((item) => (
        <div
          key={item.id}
          className="flex bg-white shadow-md rounded-xl p-4 items-center gap-6"
        >
          {/* --- IMAGEN + INFO ARRIBA --- */}
          <div className="relative">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Comprado - #{item.codigo}
            </div>

            <p className="text-xs mt-2 text-gray-500">
              Entregado el {item.fecha}
            </p>
          </div>

          {/* --- INFORMACIÓN CENTRO --- */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.nombre}</h3>

            {/* Estrellas */}
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl ${
                    star <= item.estrellas ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* --- PRECIO + BOTONES --- */}
          <div className="text-right w-40">
            <p className="text-lg font-bold text-[#1B2A40]">
              S/ {item.precio.toFixed(2)}
            </p>

            <button className="block w-full bg-[#1B2A40] text-[#F5E3C3] py-2 rounded-lg mt-3">
              Comprar de nuevo
            </button>

            <button className="block w-full border border-[#1B2A40] text-[#1B2A40] py-2 rounded-lg mt-2">
              Más detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}