import { LabelInput } from "../ui/labelInput";
import { PrimaryButton } from "../ui/primaryButton";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <form
        className="
          flex flex-col items-center gap-6
          w-full max-w-lg
          p-10
          rounded-2xl
          bg-white/25
          backdrop-blur-lg
          shadow-2xl
          border border-white/30
        "
      >
        <h2 className="text-3xl font-extrabold text-white mb-4 drop-shadow-md">
          Iniciar Sesión
        </h2>

        <div className="w-full flex flex-col gap-5">
          <LabelInput
            legend="Usuario"
            placeholder="Ej: usuario123"
            required
            className="text-lg px-4 rounded-lg"
          />
          <LabelInput
            legend="Contraseña"
            placeholder="*********"
            required
            type="password"
            className="text-lg px-4 rounded-lg"
          />
        </div>

        <PrimaryButton
          type="submit"
          className="mt-6 w-full py-3 text-lg font-semibold"
        >
          Iniciar Sesión
        </PrimaryButton>
      </form>
    </div>
  );
}
