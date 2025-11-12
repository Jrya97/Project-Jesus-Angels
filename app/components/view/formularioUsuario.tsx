'use client';

import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";
import { FaEnvelope, FaUser, FaBan, FaUserCog } from "react-icons/fa";

import { useFormUsuario } from "@/hooks/useFormUsuarios";

export default function FormularioUsuario() {

    const { formUsuario, handleChange, handleSubmit } = useFormUsuario();

  return (
    <form onSubmit={handleSubmit} className="space-y-2  transition-all">
      <InputFormAdmin
        label="Nombre"
        name="nombre"
        placeholder="Ingrese el nombre"
        value={formUsuario.nombre}
        onChange={handleChange}
        required
        icon={<FaUser />}
        autoComplete="given-name"
      />

      <InputFormAdmin
        label="Correo Electrónico"
        name="correo_electronico"
        placeholder="JesusAngels@ejemplo.com"
        value={formUsuario.correo_electronico}
        onChange={handleChange}
        required
        icon={<FaEnvelope />}
        type="email"
        autoComplete="email"
      />

      <InputFormAdmin
        label="Contraseña"
        name="password"
        placeholder="********"
        value={formUsuario.password}
        onChange={handleChange}
        required
        icon={<FaBan />}
        type="password"
        autoComplete="current-password"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingresa el rol del Usuario
        </label>
        <div className="relative">
          <FaUserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
          <select
            name="rol"
            value={formUsuario.rol}
            onChange={handleChange}
            required
            className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 
            focus:border-transparent transition-all outline-none appearance-none bg-white/50"
          >
            <option value="">Seleccione un apoderado</option>

            <option value="ADMIN">Direccion</option>
            <option value="PROFESOR">Profesor</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <SecondButton>Guardar Usuario</SecondButton>
    </form>
  );
}
