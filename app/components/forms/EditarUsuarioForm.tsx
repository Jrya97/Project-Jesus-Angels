"use client";

import { useState, useEffect } from "react";
import { Perfil } from "@/types/types";
import { useEditUsuario } from "@/hooks/useEditUsuario";
import { FaUser } from "react-icons/fa";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";

interface EditarUsuarioFormProps {
    usuario: Perfil;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditarUsuarioForm({ usuario, onClose, onSuccess }: EditarUsuarioFormProps) {
    const { editUsuario, loading, error } = useEditUsuario();
    const [formData, setFormData] = useState<Perfil>({
        nombre: "",
        correoElectronico: "",
        rol: "",
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre,
                correoElectronico: usuario.correoElectronico || "",
                rol: usuario.rol,
            });
        }
    }, [usuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (usuario.id) {
            const result = await editUsuario(usuario.id, formData);
            if (result) {
                onSuccess();
                onClose();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputFormAdmin
                label="Nombre Completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre del usuario"
                required
                icon={<FaUser />}
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Rol</label>
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 outline-none"
                    required
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="PROFESOR">PROFESOR</option>
                </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3 mt-4">
                <SecondButton type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
                    Cancelar
                </SecondButton>
                <SecondButton type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </SecondButton>
            </div>
        </form>
    );
}
