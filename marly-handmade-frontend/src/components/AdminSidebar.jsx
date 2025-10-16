import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

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
    <aside
      style={{
        width: "230px",
        backgroundColor: "#ffffffff",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100vh", // altura exacta de la ventana
        position: "fixed", // fija el sidebar
        top: 0, // se ancla arriba
        left: 0, // se ancla a la izquierda
        overflowY: "auto", // permite desplazamiento interno si el contenido es largo
      }}
    >
      <div
        style={{
          padding: "30px 20px",
          borderBottom: "1px solid #040F2F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="flex justify-center items-center">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto object-contain cursor-pointer flex-shrink-0"
            />
          </a>
        </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "20px 0" }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 20px",
              color: "#040F2F",
              textDecoration: "none",
              backgroundColor:
                location.pathname === item.to
                  ? "rgba(151, 170, 255, 0.25)"
                  : "transparent",
              borderLeft:
                location.pathname === item.to ? "4px solid white" : "none",
            }}
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

      <Link
        to="/admin/profile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "20px",
          color: "#040F2F",
          textDecoration: "none",
          borderTop: "1px solid #040F2F",
        }}
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
  );
}

export default Sidebar;
