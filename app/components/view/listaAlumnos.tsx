'use client';
import { useState } from "react";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { FaUser } from "react-icons/fa";
import { useFormMatricula } from "@/hooks/useFormMatricula";
import Link from "next/link";

export default function ListaAlumnos() {
  const { alumnos } = useFormMatricula();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlumnos = alumnos.filter((a) => {
    const term = searchTerm.toLowerCase();
    const nombre = a.nombre?.toLowerCase() || "";
    const apellido = a.apellido?.toLowerCase() || "";
    const id = String(a.idAlumno || (a as any).id_alumno || "");

    return (
      nombre.includes(term) ||
      apellido.includes(term) ||
      id.includes(term)
    );
  });

  return (
    <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8">
      <section className="w-full max-w-md bg-white/60 rounded-md py-2 px-2 shadow-xl">
        <InputFormAdmin
          label="Buscar Alumno"
          name="search"
          placeholder="Buscar por Nombre, Apellido o ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FaUser />}
          autoComplete="off"
        />
      </section>

      <section className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Lista de Alumnos
        </h1>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {filteredAlumnos.map((a, index) => (
            <Link
              key={a.idAlumno || (a as any).id_alumno || index}
              href={`/admin/alumnos/${a.idAlumno || (a as any).id_alumno}`}
            >
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
                  {(a.idAlumno || (a as any).id_alumno) && (
                    <p className="text-xs text-gray-400 mt-1">ID: {a.idAlumno || (a as any).id_alumno}</p>
                  )}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </article>
  );
}
