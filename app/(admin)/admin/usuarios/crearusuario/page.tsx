import { SecondLink } from "@/app/components/ui/SecondButton";
import FormularioUsuario from "@/app/components/view/formularioUsuario";

export default function NuevoPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <article className="w-full max-w-4xl relative z-10">
        <SecondLink href="/admin/usuarios">
          Volver a la Lista de Usuarios
        </SecondLink>
        <div className="bg-white/55 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mt-4">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Crear Nuevo Usuario
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Complete el formulario para registrar un nuevo usuario en el sistema
            </p>
          </div>
          <FormularioUsuario />
        </div>
      </article>
    </div>
  );
}
