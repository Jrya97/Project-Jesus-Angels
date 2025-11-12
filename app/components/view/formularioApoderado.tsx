"use client";

import { FaUser, FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa";
import { useFormApoderado } from "@/hooks/useFromApoderado";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";

export default function FormApoderado() {
  const { formApoderado, handleChange, handleSubmit } =
    useFormApoderado();

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <InputFormAdmin
        label="Nombre"
        name="nombre"
        placeholder="Ingrese el nombre"
        value={formApoderado.nombre}
        onChange={handleChange}
        required
        icon={<FaUser />}
        autoComplete="given-name"
      />
      <InputFormAdmin
        label="DNI"
        name="dni"
        placeholder="Número de documento"
        value={formApoderado.dni}
        onChange={handleChange}
        required
        icon={<FaIdCard />}
        autoComplete="national-id"
      />
      <InputFormAdmin
        label="Teléfono"
        name="telefono"
        placeholder="Número de contacto"
        value={formApoderado.telefono}
        onChange={handleChange}
        required
        icon={<FaPhone />}
        type="tel"
        autoComplete="tel"
      />

      <InputFormAdmin
        label="Correo Electrónico"
        name="correo_electronico"
        placeholder="JesusAngels@ejemplo.com"
        value={formApoderado.correo_electronico}
        onChange={handleChange}
        required
        icon={<FaEnvelope />}
        type="email"
        autoComplete="email"
      />

      <SecondButton>Guardar Apoderado</SecondButton>
    </form>
  );
}
