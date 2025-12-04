"use client";

import { useState } from "react";

export function useDeleteUsuario() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deleteUsuario = async (id: string) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/perfiles/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el usuario");
            }

            return true;
        } catch (err) {
            setError("Error al eliminar el usuario");
            console.error(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteUsuario,
        loading,
        error,
    };
}
