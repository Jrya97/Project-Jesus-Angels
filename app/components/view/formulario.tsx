import { LabelInput } from "../ui/labelInput";
import { PrimaryButton } from "../ui/primaryButton";

export function Formulario() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-transparent
    w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-2/4"
    >
      <form className="flex flex-col p-10 gap-6 w-full max-w-lg rounded-2xl bg-white/25 backdrop-blur-lg shadow-2xl border border-white/95">
        <LabelInput
          legend="Nombre y Apellido"
          placeholder="Ej: Pepito Quispe"
          required
        />
        <LabelInput legend="Teléfono" placeholder="Ej: 987654321" required />
        <LabelInput
          legend="Correo Electrónico"
          placeholder="Ej: contacto@gmail.com"
          required
        />
        <LabelInput
          legend="Mensaje"
          placeholder="Ej: Me gustaría información sobre..."
          multiline
        />
        <PrimaryButton className="w-full sm:w-40">Enviar</PrimaryButton>
      </form>
    </div>
  );
}
