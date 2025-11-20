import AlumnoDetalleClient from "./AlumnoDetalleClient";

export default async function AlumnoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <AlumnoDetalleClient id={id} />;
}