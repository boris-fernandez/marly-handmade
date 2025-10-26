import { BrowserRouter } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

function obtenerSubDesdeToken(token) {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded.sub);
    return decoded.sub || null;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { openCart } = useCart();
  const { token, logout } = useContext(AuthContext);
  console.log("Token en Header:", token, typeof token);

  const userName = useMemo(() => {
    if (!token) return null;
    const name = obtenerSubDesdeToken(token.token);
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }, [token]);

  const toggleMenu = () => {
    setMenuOpen((v) => {
      const newV = !v;
      if (!newV) {
        setShopOpen(false);
        setCollectionsOpen(false);
      }
      return newV;
    });
  };

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
    <header className="w-full border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* NAV DESKTOP */}
        <nav className="hidden md:block">
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

            <li className="relative group cursor-pointer">
              <a
                href="/collections"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Collections
              </a>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg py-6 px-4 z-20 max-w-[95vw] w-[700px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/product/sea-collection"
                          className="hover:text-[#040F2E]"
                        >
                          SEA COLLECTION
                        </a>
                      </li>
                      <li>
                        <a
                          href="/MATARITA COLLECTION"
                          className="hover:text-[#040F2E]"
                        >
                          MATARITA COLLECTION
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <a
                      href="/product/sea-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E]"
                    >
                      <img
                        src="/sea-collection.jpg"
                        alt="Sea Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        SEA COLLECTION
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <a
                      href="/matarita-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E]"
                    >
                      <img
                        src="/matarita-collection.jpg"
                        alt="Matarita Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        MATARITA COLLECTION
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li className="cursor-pointer">Our Story</li>
          </ul>
        </nav>

        {/* LOGO */}
        <div className="flex justify-center items-center px-2 sm:px-6 py-2 sm:py-4">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto cursor-pointer flex-shrink-0"
            />
          </a>
        </div>

      

        {/* ICONS + HAMBURGER */}
        <div className="flex items-center space-x-4">
          {/* 🔽 Menú de cuenta */}
          <div className="relative" ref={menuRef}>
            {token ? (
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <User className="w-5 h-5 text-[#040F2E]" />
                <div className="text-sm text-[#040F2E]">
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

            {/* 🔽 Menú desplegable */}
            {open && token && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Ver perfil
                </Link>
                <Link
                  to="/configuracion"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Configuración
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none cursor-pointer" />
          </div>
          <Search className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          <select className="rounded px-2 py-1 text-sm hidden sm:block cursor-pointer">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>
          
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
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 font-serif">
          <div>
            <button
              onClick={() => setShopOpen((v) => !v)}
              className="w-full flex justify-between items-center py-2 text-left hover:text-[#040F2E]"
            >
              <span>Shop</span>
              <span className="text-sm">{shopOpen ? "−" : "+"}</span>
            </button>
            {shopOpen && (
              <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Category</h4>
                  <ul className="text-sm text-[#2C3E5E] space-y-1">
                    <li>Bracelets</li>
                    <li>Earrings</li>
                    <li>Necklaces</li>
                    <li>Rings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Material</h4>
                  <ul className="text-sm text-[#2C3E5E] space-y-1">
                    <li>Polymer Clay</li>
                    <li>Copper Wire</li>
                    <li>Resin</li>
                    <li>Textile</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Featured</h4>
                  <ul className="text-sm text-[#2C3E5E] space-y-1">
                    <li>Best Sellers</li>
                    <li>Marly's Favorites</li>
                  </ul>
                </div>
                <a href="/marly-favorites" className="block mt-2">
                  <img
                    src="/nayblueear.jpg"
                    alt="Marly's favorites"
                    className="w-36 h-28 object-cover rounded-lg"
                  />
                </a>
              </div>
            )}
          </div>

          <div className="mt-3">
            <button
              onClick={() => setCollectionsOpen((v) => !v)}
              className="w-full flex justify-between items-center py-2 text-left hover:text-[#040F2E]"
            >
              <span>Collections</span>
              <span className="text-sm">{collectionsOpen ? "−" : "+"}</span>
            </button>
            {collectionsOpen && (
              <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
                <a href="/product/sea-collection" className="block">
                  <img
                    src="/sea-collection.jpg"
                    alt="Sea"
                    className="w-36 h-28 object-cover rounded-lg"
                  />
                  <div className="mt-1 text-sm">SEA COLLECTION</div>
                </a>
                <a href="/matarita-collection" className="block">
                  <img
                    src="/matarita-collection.jpg"
                    alt="Matarita"
                    className="w-36 h-28 object-cover rounded-lg"
                  />
                  <div className="mt-1 text-sm">MATARITA COLLECTION</div>
                </a>
              </div>
            )}
          </div>

          <div className="mt-3">
            <a href="/our-story" className="block py-2 hover:text-[#040F2E]">
              Our Story
            </a>
          </div>
        </div>
      )}
    </header>
  );
}