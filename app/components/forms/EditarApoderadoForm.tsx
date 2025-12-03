"use client";

import { useState } from "react";
import { FaSave, FaTimes, FaUser, FaIdCard, FaPhone, FaEnvelope } from "react-icons/fa";
import { SecondButton } from "../ui/SecondButton";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { createHandleChange } from "@/utils/formHelpers"
import type { Apoderado } from "@/types/types";

interface EditarApoderadoFormProps {
    apoderado: Apoderado;
    onSave: (apoderado: Apoderado) => void;
    onCancel: () => void;
}

export const EditarApoderadoForm = ({ apoderado, onSave, onCancel }: EditarApoderadoFormProps) => {
    const [formData, setFormData] = useState<Apoderado>(apoderado);

    const handleChange = createHandleChange(setFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                    <InputFormAdmin
                        label="Nombre Completo"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        icon={<FaUser />}
                    />
                </div>

                <InputFormAdmin
                    label="DNI"
                    name="dni"
                    type="text"
                    value={formData.dni}
                    onChange={handleChange}
                    maxLength={8}
                    pattern="[0-9]{8}"
                    required
                    icon={<FaIdCard />}
                />

                <InputFormAdmin
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    maxLength={9}
                    pattern="[0-9]{9}"
                    required
                    icon={<FaPhone />}
                />

                <div className="sm:col-span-2">
                    <InputFormAdmin
                        label="Correo Electrónico"
                        name="correo_electronico"
                        type="email"
<<<<<<< HEAD
                        value={formData.correo_electronico}
=======
                        value={formData.correoElectronico}
>>>>>>> dev
                        onChange={handleChange}
                        required
                        icon={<FaEnvelope />}
                    />
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
                <SecondButton type="submit" className="!w-full sm:!w-auto flex items-center justify-center gap-2 order-1 sm:order-2 text-sm sm:text-base">
                    <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                    Guardar Cambios
                </SecondButton>
            </div>
        </form>
    );
};
