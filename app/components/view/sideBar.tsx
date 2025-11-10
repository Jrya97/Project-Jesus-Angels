"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSignOutAlt, FaCalendarAlt  } from "react-icons/fa";
import { MdFactCheck, MdSchool} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Inicio", icon: <FaHome size={18} /> },
    { href: "/admin/matricula", label: "Matricula", icon: <MdFactCheck size={18} /> },
    { href: "/admin/notas", label: "Notas", icon: <MdSchool size={18} /> },
    { href: "/admin/asistencia", label: "Asistencia", icon: <FaCalendarAlt size={18} /> },
    { href: "/admin/alumnos", label: "Alumnos", icon: <FaPeopleGroup size={18} /> },
  ];

  return (
    <aside className="h-screen w-64 bg-linear-to-b from-green-600 to-[#24a9e7] text-white flex flex-col justify-between shadow-lg">
      <div>
        <div className="p-6 text-2xl font-bold text-center border-b border-white/20">
          Panel de Administrador
        </div>

        <nav className="flex flex-col mt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "bg-white/25 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-white/20">
          
        <button className="flex items-center gap-2 w-full text-left hover:bg-white/10 px-3 py-2 rounded-md">
          <FaSignOutAlt size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
