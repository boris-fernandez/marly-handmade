import { BrowserRouter } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const { openCart } = useCart();
  const { token, logout } = useContext(AuthContext);


  const toggleMenu = () => {
    setMenuOpen(v => {
      const newV = !v;
      if (!newV) {
        setShopOpen(false);
        setCollectionsOpen(false);
      }
      return newV;
    });
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="flex items-center px-6 md:px-10 py-8">
        {/* NAV DESKTOP */}
        <nav className="hidden md:flex md:flex-1 justify-start">
          <ul className="flex items-center space-x-10 font-serif font-medium">
            <li><a href="/shop" className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300">Shop</a></li>
            <li><a href="/collections" className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300">Collections</a></li>
            <li>Our Story</li>
          </ul>
        </nav>

        {/* LOGO */}
        <div className="flex justify-center items-center">
          <Link to="/" className="flex items-center">
            <img src="/logoMarly.png" alt="Marly logo" className="h-10 w-auto object-contain cursor-pointer flex-shrink-0" />
          </Link>
        </div>

        {/* ICONS + HAMBURGER */}
        <div className="flex flex-1 justify-end items-center space-x-4">
          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none" />
          </div>
          <select className="rounded px-2 py-1 text-sm hidden sm:block cursor-pointer">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>
          <Search className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          {/* CONDICIONAL PARA TOKEN DE LOGIN */}
          {token ? (
            <button
              onClick={logout}
              className="text-[#040F2E] font-medium cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <User className="w-5 h-5 cursor-pointer text-[#040F2E]" />
            </Link>
          )}

          {/* CART */}
          <button
            onClick={openCart}
            className="relative"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          </button>

          <button
            className="md:hidden p-2 text-[#040F2E]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 font-serif">{/* contenido mobile */}</div>}
    </header>
  );
}
