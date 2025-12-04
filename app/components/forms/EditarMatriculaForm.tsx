"use client";

import { useState } from "react";
import { FaSave, FaTimes, FaCalendarAlt, FaBook } from "react-icons/fa";
import { SecondButton } from "../ui/SecondButton";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { createHandleChange } from "@/utils/formHelpers";
import type { Matricula } from "@/types/types";

interface EditarMatriculaFormProps {
    matricula: Matricula;
    onSave: (matricula: Matricula) => void;
    onCancel: () => void;
}

export const EditarMatriculaForm = ({ matricula, onSave, onCancel }: EditarMatriculaFormProps) => {
    const [formData, setFormData] = useState<Matricula>(matricula);

    const handleChange = createHandleChange(setFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ">

                <InputFormAdmin
                    label="Año Lectivo"
                    name="anioLectivo"
                    type="text"
                    value={formData.anioLectivo}
                    onChange={handleChange}
                    required
                    icon={<FaCalendarAlt />}
                />

                <InputFormAdmin
                    label="Fecha de Matrícula"
                    name="fechaMatricula"
                    type="date"
                    value={formData.fechaMatricula}
                    onChange={handleChange}
                    required
                    icon={<FaCalendarAlt />}
                />

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaBook className="text-gray-400" />
                        </div>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="RETIRADO">RETIRADO</option>
                            <option value="ANULADO">ANULADO</option>
                        </select>
                    </div>
                </div>
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
                    Guardar Cambios
                </SecondButton>
            </div>
        </form>
    );
};
