import { useState, useContext, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

// Funciones Auxiliares
function obtenerSubDesdeToken(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded);
    return decoded.sub || decoded.username || null;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
}

function verificarAdmin(token) {
  try {
    const decoded = jwtDecode(token);
    // NOTA: La lógica de admin DEBE coincidir con la que uses en tu backend.
    // Aquí se verifica que el 'sub' sea 'Maryen'.
    return decoded.sub === 'Maryen'; 
  } catch {
    return false;
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false); // No se usa actualmente
  const [collectionsOpen, setCollectionsOpen] = useState(false); // No se usa actualmente
  const [open, setOpen] = useState(false); // Estado para el dropdown del usuario

  const menuRef = useRef(null);
  const { openCart } = useCart();
  const { token, logout } = useContext(AuthContext);

  console.log("Token en Header:", token);

  // 🔹 Nombre de usuario (Memoizado)
  const userName = useMemo(() => {
    if (!token?.token) return null;
    const name = obtenerSubDesdeToken(token.token);
    // Formatea la primera letra a mayúscula
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : null;
  }, [token]);

  // 🔹 Verificar si es admin (Memoizado)
  const isAdmin = useMemo(() => {
    if (!token?.token) return false;
    return verificarAdmin(token.token);
  }, [token]);

  // 🔹 Cerrar el dropdown del usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header py-4">
      <div className="header-container">
        {/* NAV DESKTOP */}
        <nav className="nav-desktop">
          <ul className="flex items-center space-x-10 font-serif font-medium">
            <li className="relative group cursor-pointer">
              <a
                href="/shop"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Shop
              </a>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg py-6 px-4 z-20 max-w-[95vw] w-[700px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Category
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a href="/Bracelets" className="hover:text-[#040F2E]">
                          Bracelets
                        </a>
                      </li>
                      <li>
                        <a href="/Earrings" className="hover:text-[#040F2E]">
                          Earrings
                        </a>
                      </li>
                      <li>
                        <a href="/Necklaces" className="hover:text-[#040F2E]">
                          Necklaces
                        </a>
                      </li>
                      <li>
                        <a href="/Rings" className="hover:text-[#040F2E]">
                          Rings
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Material
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/Polymer Clay"
                          className="hover:text-[#040F2E]"
                        >
                          Polymer Clay
                        </a>
                      </li>
                      <li>
                        <a href="/Copper Wire" className="hover:text-[#040F2E]">
                          Copper Wire
                        </a>
                      </li>
                      <li>
                        <a href="/Resin" className="hover:text-[#040F2E]">
                          Resin
                        </a>
                      </li>
                      <li>
                        <a href="/Textile" className="hover:text-[#040F2E]">
                          Textile
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Featured
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/Best Sellers"
                          className="hover:text-[#040F2E]"
                        >
                          Best Sellers
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Marly's Favorites"
                          className="hover:text-[#040F2E]"
                        >
                          Marly's Favorites
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <a href="/marly-favorites" className="block relative group">
                      <img
                        src="/nayblueear.jpg"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        alt="Marly's favorites"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[#F5E3C3] font-serif text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
                        Marly's Favorites
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>

  return (
    <header className="w-full border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* NAV DESKTOP */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-10 font-serif font-medium">
            <li className="relative group cursor-pointer">
              <a href="/shop" className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300">
                Shop
              </a>
            </li>

            <li className="relative group cursor-pointer">
              <a href="/collections" className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300">
                Collections
              </a>
            </li>

        {/* LOGO */}
        <div className="logo">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto cursor-pointer flex-shrink-0"
            />
          </a>
        </div>

            {/* ✅ CORRECCIÓN APLICADA: visible solo para admin logueado */}
            {isAdmin ? (
              <li className="cursor-pointer">
                <Link
                  to="/admin/dashboard"
                  className="pb-2 border-b-2 border-transparent hover:border-[#997C71] transition-colors duration-300 text-[#997C71] font-semibold"
                >
                  Admin Panel
                </Link>
              </li>
            ): null}
          </ul>
        </nav>

        {/* ICONS + HAMBURGER */}
        <div className="icons">
          {/* 🔽 Menú de cuenta */}
          <div className="relative" ref={menuRef}>
            {token ? (
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <User className="w-5 h-5 text-[#040F2E]" />
                <div className="helloUser text-sm text-[#040F2E]">
                  <p>
                    Hello, <span className="font-medium">{userName}</span>
                  </p>
                  <p className="font-bold">My Account</p>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <User className="w-5 h-5 text-[#040F2E]" />
              </Link>
            )}

        {/* ICONOS */}
        <div className="flex items-center space-x-4">
          {/* 🌍 Idioma */}
          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none cursor-pointer" />
          </div>

          {/* 🔍 Buscar */}
          <Search className="w-5 h-5 cursor-pointer text-[#040F2E]" />

          {/* 💰 Moneda */}
          <select className="rounded px-2 py-1 text-sm hidden sm:block cursor-pointer">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>

          {/* 👤 Usuario */}
          <div className="relative" ref={menuRef}>
            {token ? (
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <User className="w-5 h-5 text-[#040F2E]" />
                <div className="text-sm text-[#040F2E] hidden sm:block">
                  <p>Hello, <span className="font-medium">{userName}</span></p>
                  <p className="font-bold">My Account</p>
                </div>
                {/* Asegura que el icono de usuario sea visible en móvil si hay token */}
                <span className="sm:hidden">
                    <User className="w-5 h-5 text-[#040F2E]" />
                </span>
              </div>
            ) : (
              <Link to="/login">
                <User className="w-5 h-5 text-[#040F2E]" />
              </Link>
            )}

            {/* 🔽 Menú desplegable */}
            {open && token && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{userName}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#997C71] text-white text-xs rounded">
                      Admin
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    📊 Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Mi Perfil
                </Link>

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {/* 🛒 Carrito */}
          <button onClick={openCart} className="relative" aria-label="Abrir carrito">
            <ShoppingCart className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          </button>

          {/* ☰ Hamburguesa */}
          <button
            className="md:hidden p-2 text-[#040F2E]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 font-serif">
          <a href="/shop" className="block py-2 hover:text-[#040F2E]">Shop</a>
          <a href="/collections" className="block py-2 hover:text-[#040F2E]">Collections</a>
          <a href="/our-story" className="block py-2 hover:text-[#040F2E]">Our Story</a>

          {isAdmin && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Link
                to="/admin/dashboard"
                className="block py-2 text-[#997C71] font-semibold hover:text-[#7a6359]"
              >
                📊 Admin Dashboard
              </Link>
            </div>
          )}

          {token && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">
                Logged in as:{" "}
                <span className="font-medium text-gray-900">{userName}</span>
                {isAdmin && (
                  <span className="ml-2 px-2 py-0.5 bg-[#997C71] text-white text-xs rounded">
                    Admin
                  </span>
                )}
              </div>
                <Link
                  to="/perfil"
                  className="block w-full text-left py-2 text-gray-700 hover:text-gray-900"
                >
                  Mi Perfil
                </Link>
              <button
                onClick={logout}
                className="block w-full text-left py-2 text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}