import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserHeader from "../components/UserHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderAddrees from "../components/HeaderAddress.jsx";
function UserLayout() {
  return (
    <>
    <Header />
    <HeaderAddrees />
    
        <div className="flex bg-gray-100 min-h-screen">

        {/* LADO IZQUIERDO → MENÚ */}
        <div>          
          <UserSidebar />  
        </div>

        <div className="me-18 flex-1 flex flex-col overflow-y-auto">

            <div className="p-8 ">
            <UserHeader />
            </div>

            {/* CONTENIDO (Outlet carga Perfil, Direcciones, Historial...) */}
            <main className="px-6 pb-10">
            <div className="bg-white shadow-sm rounded-lg p-6">
              
              <Outlet />
            </div>
            </main>
        </div>

        </div>
    <Footer />
    </>
  );
}

export default UserLayout;
