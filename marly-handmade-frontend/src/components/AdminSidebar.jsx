import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "home" },
    { to: "/admin/products", label: "Products Register", icon: "box" },
    { to: "/admin/users", label: "Users", icon: "users" },
    { to: "/admin/inventory", label: "Inventory", icon: "package" },
    { to: "/admin/orders", label: "Orders", icon: "shopping-bag" },
    { to: "/admin/content", label: "Content Management", icon: "menu" },
    { to: "/admin/reports", label: "Reports / Analytics", icon: "pie-chart" },
  ];

  const getIcon = (name) => {
    switch (name) {
      case "home":
        return <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
      case "box":
        return (
          <>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </>
        );
      case "users":
        return (
          <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        );
      case "package":
        return (
          <>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </>
        );
      case "shopping-bag":
        return (
          <>
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </>
        );
      case "menu":
        return (
          <>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </>
        );
      case "pie-chart":
        return (
          <>
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Botón de menú visible solo en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#040F2F] text-white p-2 rounded-md"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-[230px] bg-white text-[#040F2F] flex flex-col shadow-md transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#040F2F] flex justify-center">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto object-contain cursor-pointer flex-shrink-0"
            />
          </a>
        </div>

        {/* Navegación */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)} // cerrar al seleccionar en móvil
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors 
              ${
                location.pathname === item.to
                  ? "bg-[#040F2F]/10 border-l-4 border-[#040F2F]"
                  : "hover:bg-[#040F2F]/5"
              }`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#040F2F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {getIcon(item.icon)}
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Perfil */}
        <Link
          to="/admin/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-5 py-4 border-t border-[#040F2F]/30"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#040F2F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </Link>
      </aside>

      {/* Fondo semitransparente para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
