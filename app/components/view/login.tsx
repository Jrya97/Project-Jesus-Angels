"use client";

import Link from "next/link";

import { LabelInput } from "../ui/labelInput";
import { PrimaryButton } from "../ui/primaryButton";
import { useLogin } from "../../../hooks/useLogin";

export default function Login() {
  const {
    email,
    password,
    error,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="
          animate-fade-up
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
            legend="Correo Electrónico"
            placeholder="ejemplo@correo.com"
            required
            type="email"
            className="text-lg px-4 rounded-lg"
            value={email}
            onChange={handleEmailChange}
          />
          <LabelInput
            legend="Contraseña"
            placeholder="*********"
            required
            type="password"
            className="text-lg px-4 rounded-lg"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {error && (
          <p className="text-red-600 font-semibold text-sm mt-2">{error}</p>
        )}

        <PrimaryButton
          type="submit"
          className="mt-6 w-full py-3 text-lg font-semibold"
        >
          Iniciar Sesión
        </PrimaryButton>

        <div className="w-full mt-4 flex justify-center">
          <Link href="/mis-notas" className="text-white hover:text-indigo-200 underline font-medium">
            ¿Eres alumno? Consulta tus notas aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
