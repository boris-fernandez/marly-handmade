import { useState, useContext } from "react";
import { OrderCard } from "./OrderCard";
import image24 from "../assets/sea4.png";
import { AuthContext } from "../contexts/AuthContext.jsx";

export function CartDrawer({ open, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      status: "Shipped",
      image: image24,
      title: "SAHARA TREASURE",
      subtitle: "Necklace",
      price: 64,
      quantity: 2,
    },
    {
      id: 2,
      status: "Shipped",
      image: image24,
      title: "SAHARA TREASURE",
      subtitle: "Necklace",
      price: 64,
      quantity: 2,
    },
  ]);

  const handleDelete = (id) =>
    setCartItems((items) => items.filter((item) => item.id !== id));

  const handleAdd = (id) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const { token, logout } = useContext(AuthContext);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay con transición */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-serif font-semibold text-lg">Tu carrito</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {token ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 && (
                <p className="text-center text-gray-500">
                  Tu carrito está vacío
                </p>
              )}
              {cartItems.map((item) => (
                <OrderCard
                  key={item.id}
                  status={item.status}
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  quantity={item.quantity}
                  onAdd={() => handleAdd(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>

            <div className="p-4 border-t space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button className="w-full bg-black text-white py-2 rounded-md font-semibold cursor-pointer">
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full border border-gray-300 py-2 rounded-md font-medium cursor-pointer"
              >
                Continuar comprando
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 text-center">
            <h3 className="text-gray-600">
              Por favor inicia sesión para ver tu carrito
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
