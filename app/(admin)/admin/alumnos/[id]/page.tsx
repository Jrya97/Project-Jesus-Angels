import { AlumnosFake } from "@/data/fakeData";

export default async function AlumnoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumno = AlumnosFake.find((a) => a.id_alumno === id);

  if (!alumno) {
    return (
      <div className="p-10 text-red-500">
        <p>No se encontró el alumno con ID: {id}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-8 bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {alumno.apellido}, {alumno.nombre}
        </h1>
        <p className="text-gray-600 mb-2">DNI: {alumno.dni}</p>
        <p className="text-gray-600 mb-2">Dirección: {alumno.direccion}</p>
        <p className="text-gray-600">Fecha Nacimiento: {alumno.fecha_nacimiento}</p>
      </div>
    </section>
  );
}
