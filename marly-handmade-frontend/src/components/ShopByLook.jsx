import { useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function ShopByLook() {
  const products = [
    {
      id: 1,
      name: "Ocean Blue Monk Tree",
      price: 37,
      image: "/ShopByLook-tree.png",
      position: "top-[78%] left-[55%]",
    },
    {
      id: 2,
      name: "Golden Star Necklace",
      price: 35,
      image: "/ShopByLook-star.png",
      position: "top-[60%] left-[48%]",
    },
    {
      id: 3,
      name: "Golden Thin Necklace",
      price: 25,
      image: "/ShopByLook-thin.png",
      position: "top-[30%] left-[35%]",
    },
  ];

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null); // Estado hover

  return (
    <div className="px-6 py-10 flex justify-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Shop by look</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-16">
          {/* Imagen principal */}
          <div className="relative">
            <img
              src="/ShopByLook.png"
              alt="Shop by look"
              className="rounded-xl shadow-md max-w-140 h-auto"
            />

            {products.map((product) => (
              <button
                key={product.id}
                className={`absolute bg-white rounded-full p-1 shadow hover:scale-110 hover:cursor-pointer transition ${product.position}`}
                onClick={() => setSelected(product)}
                onMouseEnter={() => setHovered(product)}
                onMouseLeave={() => setHovered(null)}
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
              </button>
            ))}
          </div>

          {/* Panel lateral */}
          <div className="w-full md:w-72 flex items-center justify-center">
            {(hovered || selected) ? (
              <div className="space-y-4 text-center">
                <img
                  src={(hovered || selected).image}
                  alt={(hovered || selected).name}
                  className={`rounded-lg shadow mx-auto max-h-74 object-contain transition-opacity duration-300 ${
                    hovered ? "opacity-50" : "opacity-100"
                  }`}
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {(hovered || selected).name}
                </h3>
                <p className="text-sm text-gray-600">
                  from ${(hovered || selected).price}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 italic text-center">
                Click on a product icon to see details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
