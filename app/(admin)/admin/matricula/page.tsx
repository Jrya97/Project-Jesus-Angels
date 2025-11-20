import { SecondLink } from "@/app/components/ui/SecondButton";

export default function MatriculaPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <article className="w-full max-w-4xl relative z-10">
        <div className="bg-white/55 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Matrícula
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Seleccione una opción para continuar
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <SecondLink href="/admin/matricula/nuevoalumno">Registrar Nuevo Alumno</SecondLink>
            <SecondLink href="/admin/matricula/nuevoapoderado">Registrar Nuevo Apoderado</SecondLink>
            <SecondLink href="/admin/matricula/nuevamatricula">Crear Nueva Matrícula</SecondLink>
          </div>
        </div>
      </article>
    </div>
  );
}
