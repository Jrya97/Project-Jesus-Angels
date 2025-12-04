"use client";

import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";
import { useFormAlumno } from "@/hooks/useFormAlumno";
import { InputFormAdmin } from "@/app/components/ui/labelFormularioAdmin";
import { SecondButton } from "@/app/components/ui/SecondButton";

export default function FormAlumno() {
  const { formAlumno, apoderados, handleChange, handleSubmit } =
    useFormAlumno();

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <InputFormAdmin
          label="Nombre"
          name="nombre"
          placeholder="Ingrese el nombre"
          value={formAlumno.nombre}
          onChange={handleChange}
          required
          icon={<FaUser />}
          type="text"
          autoComplete="given-name"
        />

        <InputFormAdmin
          label="Apellido"
          name="apellido"
          placeholder="Ingrese el apellido"
          value={formAlumno.apellido}
          onChange={handleChange}
          required
          icon={<FaUser />}
          type="text"
          autoComplete="family-name"
        />
      </div>
      <InputFormAdmin
        label="DNI"
        name="dni"
        placeholder="Número de documento"
        value={formAlumno.dni}
        onChange={handleChange}
        required
        icon={<FaIdCard />}
        type="text"
        autoComplete="national-id"
      />
      <InputFormAdmin
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        placeholder="Fecha de Nacimiento"
        value={formAlumno.fechaNacimiento}
        onChange={handleChange}
        required
        icon={<FaCalendarAlt />}
        type="date"
        autoComplete="bday"
      />

      <InputFormAdmin
        label="Dirección"
        name="direccion"
        placeholder="Ingrese la dirección"
        value={formAlumno.direccion}
        onChange={handleChange}
        required
        icon={<FaMapMarkerAlt />}
        autoComplete="street-address"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Apoderado
        </label>
        <div className="relative">
          <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
          <select
            name="apoderado.idApoderado"
            value={formAlumno.apoderado.idApoderado}
            onChange={handleChange}
            required
            className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent transition-all outline-none appearance-none bg-white/50"
          >
            <option value="">Seleccione un apoderado</option>
            {apoderados.map((a) => (
              <option key={a.idApoderado} value={a.idApoderado}>
                {a.nombre} - {a.dni}
              </option>
            ))}
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

      <SecondButton type="submit">Guardar Alumno</SecondButton>
    </form>
  );
}
