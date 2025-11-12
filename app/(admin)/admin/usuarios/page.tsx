import ListaUsuarios from "@/app/components/view/listaUsuarios";

export default function UsuariosPage() {
  return (
    <section className="relative w-full flex items-start justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Fondo-Admin.mp4" type="video/mp4" />
      </video>
      <div className="fixed top-0 left-0 w-full h-full bg-white/50 -z-10"></div>
      <ListaUsuarios />
    </section>
  );
}
