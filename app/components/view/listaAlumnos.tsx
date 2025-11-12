"use client";
import { useFormAlumno } from "@/hooks/useFromAlumno";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { FaUser } from "react-icons/fa";
import { useFormMatricula } from "@/hooks/useFormMatricula";
import Link from "next/link";

export default function ListaAlumnos() {
  const { handleChange, formAlumno } = useFormAlumno();
  const { alumno } = useFormMatricula();

  return (
    <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10">
      <section className="w-full max-w-md bg-white/60 rounded-md py-2 px-2 shadow-xl">
        <InputFormAdmin
          label="Buscar Alumno"
          name="alumno"
          placeholder="Ingrese el nombre"
          value={formAlumno.nombre}
          onChange={handleChange}
          icon={<FaUser />}
          autoComplete="given-name"
        />
      </section>

      <section className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Lista de Alumnos
        </h1>

        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-6">
          {alumno.map((a) => (
            <Link key={a.id_alumno} href={`/admin/alumnos/${a.id_alumno}`}>
              <li className="flex flex-col justify-between bg-white/85 shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                <div className="flex-1 mb-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {a.apellido}, {a.nombre}
                  </h2>
                  <p className="text-sm text-gray-500 overflow-hidden">
                    DNI: {a.dni}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                    {a.direccion}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </article>
  );
}
