import ListaAlumnos from '@/app/components/view/listaAlumnos'

export default function AlumnosPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start p-6">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Fondo-Admin.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-white/50 -z-10"></div>

      <ListaAlumnos />
    </section>
  )
}
