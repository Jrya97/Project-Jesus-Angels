"use client";

import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { useFormMatricula } from "@/hooks/useFormMatricula";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";

export default function FormMatricula() {
  const { formMatricula, handleChange, handleSubmit, alumnos, grados } = useFormMatricula();

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccione el alumno
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
          <select
            name="alumno.idAlumno"
            value={formMatricula.alumno.idAlumno}
            onChange={handleChange}
            required
            className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
             border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
             transition-all outline-none appearance-none bg-white/50 "
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map((a) => (
              <option key={a.idAlumno} value={a.idAlumno}>
                {a.nombre} {a.apellido} - DNI: {a.dni}
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
      <div className="flex justify-evenly">
        <InputFormAdmin
          label="Año Electivo"
          name="anioLectivo"
          placeholder="2025"
          value={formMatricula.anioLectivo}
          onChange={handleChange}
          required
          icon={<FaCalendarAlt />}
          type="text"
          autoComplete="text"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccione el grado
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
            <select
              name="grado.idGrado"
              value={formMatricula.grado.idGrado}
              onChange={handleChange}
              required
              className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
             border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
             transition-all outline-none appearance-none bg-white/50"
            >
              <option value="">Seleccion de grado</option>
              {grados.map((a) => (
                <option key={a.idGrado} value={a.idGrado}>
                  {a.nombre} - {a.nivel}
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
        <InputFormAdmin
          label="Fecha de la matricula"
          name="fechaMatricula"
          placeholder="Número de contacto"
          value={formMatricula.fechaMatricula}
          onChange={handleChange}
          required
          icon={<FaCalendarAlt />}
          type="date"
          autoComplete="bday"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado de la matricula
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
          <select
            name="estado"
            value={formMatricula.estado}
            onChange={handleChange}
            required
            className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-black/90 focus:border-transparent transition-all outline-none appearance-none bg-white/50 text-center"
          >
            <option value="">Seleccione el estado</option>
            <option value="ACTIVO">Estado Activo</option>
            <option value="RETIRADO">Estado Retirado</option>
            <option value="ANULADO">Estado Anulado</option>

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

      <SecondButton type="submit">Guardar Matricula</SecondButton>
    </form>
  );
}
