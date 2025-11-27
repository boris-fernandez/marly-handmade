import { NavLink } from "react-router-dom";
import "../styles/UserSidebar.css";

export default function UserSidebar() {
  return (
    <div className="user-sidebar-container">
      <div className="user-sidebar-card">

        <h2 className="text-lg font-semibold mb-4">Mi cuenta</h2>

        <nav className="flex flex-col gap-3 ">

          <NavLink
            to="perfile"
            className={({ isActive }) =>
              `user-sidebar-link ${isActive ? "bg-[#1B2A40] text-[#F5E3C3] rounded-[5px] font-medium" : ""}`
            }

          >
            Mi perfil
          </NavLink>

          <NavLink
            to="address"
            className={({ isActive }) =>
              `user-sidebar-link ${isActive ? "bg-[#1B2A40] text-[#F5E3C3] rounded-[5px]" : ""}`
            }
          >
            Direcciones
          </NavLink>

          <NavLink
            to="cards"
            className={({ isActive }) =>
              `user-sidebar-link ${isActive ? "bg-[#1B2A40] text-[#F5E3C3] rounded-[5px]" : ""}`
            }
          >
            Medio de pago
          </NavLink>

          {/* <NavLink
            to="record"
            className={({ isActive }) =>
              `user-sidebar-link ${isActive ? "bg-[#1B2A40] text-[#F5E3C3] rounded-[5px]" : ""}`
            }
          >
            Historial
          </NavLink>

          <NavLink
            to="Authentication"
            className={({ isActive }) =>
              `user-sidebar-link ${isActive ? "bg-[#1B2A40] text-[#F5E3C3] rounded-[5px]" : ""}`
            }
          >
            Authentication
          </NavLink> */}

        </nav>
      </div>
    </div>
  );
}
