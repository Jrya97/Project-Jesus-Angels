"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { OpcionSideBar } from "../ui/opcionSideBar";
import { FaRegChartBar } from "react-icons/fa6";
import { useLogout } from "../../../hooks/useLogout";

export default function Sidebar() {
  const { handleLogout } = useLogout();

  return (
    <aside
      className={`
        md:static top-0 left-0
        h-screen min-h-screen flex flex-col justify-between
        bg-black/90 shadow-lg
        w-[50px] md:w-48
        transition-all duration-300
        z-50
      `}
    >
      <header className="shrink-0">
        <h1 className="hidden md:block p-5 text-xl font-bold text-center border-b border-white/50 text-white">
          Panel de Administración
        </h1>

        <div className="flex md:hidden p-4 justify-center border-b border-white/50 text-2xl text-white">
          <FaRegChartBar />
        </div>

        <OpcionSideBar />
      </header>

      <footer className="shrink-0 p-4 border-t border-white/30 flex justify-center md:justify-start">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left text-white hover:bg-white/30 rounded-md md:px-2 md:py-2 transition-all active:scale-95 transform"
        >
          <FaSignOutAlt size={16} />
          <span
            className={`
              hidden md:inline
              transition-opacity duration-200
            `}
          >
            Cerrar sesión
          </span>
        </button>
      </footer>
    </aside>
  );
}