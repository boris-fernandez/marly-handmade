import { MapPin } from "lucide-react";

export default function HeaderAddress() {

  return (
    <div className="w-full bg-[#1B2A40] text-[#F5E3C3] text-sm py-3 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Ubicación */}
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <p>direccion</p>
        </div>

        {/* Enlace de contacto (igual que tu versión original) */}
        <div className="flex items-center gap-3">
          <a href="/contact" target='_blank' className="hover:underline">
            Contact
          </a>
        </div>

      </div>
    </div>
  );
}
