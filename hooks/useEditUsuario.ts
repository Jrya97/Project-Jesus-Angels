"use client";

import { useState } from "react";
import { Perfil } from "@/types/types";

export function useEditUsuario() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const editUsuario = async (id: string, data: Partial<Perfil>) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/perfiles/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Error al actualizar el usuario");
            }

            const updatedUsuario = await res.json();
            return updatedUsuario;
        } catch (err) {
            setError("Error al actualizar el usuario");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        editUsuario,
        loading,
        error,
    };
}
