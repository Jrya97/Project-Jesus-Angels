"use client";

import { useState } from "react";
import { FaSave, FaTimes, FaBook } from "react-icons/fa";
import { SecondButton } from "../ui/SecondButton";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { createHandleChange } from "@/utils/formHelpers";
import type { curso } from "@/types/types";

interface CrearCursoFormProps {
    onSave: (curso: Omit<curso, 'idCurso'>) => void;
    onCancel: () => void;
}

export const CrearCursoForm = ({ onSave, onCancel }: CrearCursoFormProps) => {
    const [formData, setFormData] = useState<Omit<curso, 'idCurso'>>({
        nombre: "",
    });

    const handleChange = createHandleChange(setFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 ">

                <InputFormAdmin
                    label="Nombre del Curso"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    icon={<FaBook />}
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-3 sm:pt-4 border-t-2 border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 order-2 sm:order-1"
                >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                    Cancelar
                </button>

                <SecondButton type="submit" className="w-full! sm:w-auto! flex items-center justify-center gap-2 order-1 sm:order-2 text-sm sm:text-base">
                    <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                    Crear Curso
                </SecondButton>
            </div>
        </form>
    );
};
