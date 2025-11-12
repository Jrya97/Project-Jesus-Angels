import { SecondLink } from "@/app/components/ui/SecondButton";
import FormularioUsuario from "@/app/components/view/formularioUsuario";

export default function NuevoPage() {
  return (
    <section className="w-full h-full relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
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

      <article className="w-full max-w-4xl relative z-10">
        <SecondLink href="/admin/usuarios">
          Volver a la Lista de Usuarios
        </SecondLink>
        <div className="bg-white/55 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Datos del nuevo Usuario
            </h3>
            <p className="text-gray-600 text-sm">
              Complete el formulario para agregar un nuevo usuario a la
              aplicación.
            </p>
          </div>
          <FormularioUsuario />
        </div>
      </article>
    </section>
  );
}
