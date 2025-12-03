'use client';

import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";
import { FaEnvelope, FaBan } from "react-icons/fa";

import { useFormUsuario } from "@/hooks/useFormUsuarios";

export default function FormularioUsuario() {

  const { formUsuario, handleChange, handleSubmit } = useFormUsuario();

  return (
    <form onSubmit={handleSubmit} className="space-y-2  transition-all">
      <InputFormAdmin
        label="Correo Electrónico"
        name="email"
        placeholder="JesusAngels@ejemplo.com"
        value={formUsuario.email}
        onChange={handleChange}
        required
        icon={<FaEnvelope />}
        type="email"
        autoComplete="email"
      />

      <InputFormAdmin
        label="Contraseña"
        name="password"
        placeholder="********"
        value={formUsuario.password}
        onChange={handleChange}
        required
        icon={<FaBan />}
        type="password"
        autoComplete="current-password"
      />
      <SecondButton type="submit">Guardar Usuario</SecondButton>
    </form>
  );
}
