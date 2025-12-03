"use client";

import { useState } from "react";
import { getPerfilById } from "@/utils/getFetch";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        const userId = data.userId || data.user?.id;

        if (userId) {
          const perfil = await getPerfilById(userId);

          if (perfil && perfil.rol === 'ADMIN') {
            window.location.href = "/admin";
          } else if (perfil && perfil.rol === 'USER') {
            window.location.href = "/profesor";
          } else {
            setError("No tienes permisos suficientes.");
          }
        } else {
          setError("Error al identificar al usuario.");
        }
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    email,
    password,
    error,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  };
}
