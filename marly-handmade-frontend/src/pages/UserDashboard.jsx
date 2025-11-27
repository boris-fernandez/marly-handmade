// pages/UserDashboard.jsx
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserHeader from "../components/UserHeader";

export default function UserDashboard() {
  return (
    <div className="flex bg-[#f6f6f6] min-h-screen">
      {/* Menú lateral */}
      <UserSidebar />

      {/* Contenido */}
      <div className="flex-1 p-8">
        <UserHeader />

        {/* Aquí cargarán los subcomponentes como Perfil, Direcciones, etc */}
        <Outlet />
      </div>
    </div>
  );
}
