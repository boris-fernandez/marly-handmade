import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  return (
    <CartContext.Provider value={{ open, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
