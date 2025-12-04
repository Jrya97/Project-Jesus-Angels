"use client";

import { useState } from "react";
import { FaSave, FaTimes, FaMoneyBillWave, FaCalendarAlt, FaBook } from "react-icons/fa";
import { SecondButton } from "../ui/SecondButton";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { createHandleChange, createHandleNumberChange } from "@/utils/formHelpers";
import type { Pago } from "@/types/types";

interface EditarPagoFormProps {
    pago: Pago;
    onSave: (pago: Pago) => void;
    onCancel: () => void;
}

export const EditarPagoForm = ({ pago, onSave, onCancel }: EditarPagoFormProps) => {
    const [formData, setFormData] = useState<Pago>(pago);

    const handleChange = createHandleChange(setFormData);
    const handleNumberChange = createHandleNumberChange(setFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ">

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mes
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendarAlt className="text-gray-400" />
                        </div>
                        <select
                            name="mes"
                            value={formData.mes || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Seleccionar Mes</option>
                            {['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'].map((mes) => (
                                <option key={mes} value={mes}>{mes}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <InputFormAdmin
                    label="Monto"
                    name="monto"
                    type="number"
                    value={formData.monto}
                    onChange={handleNumberChange}
                    required
                    icon={<FaMoneyBillWave />}
                    step="0.01"
                />

                <InputFormAdmin
                    label="Fecha de Pago"
                    name="fechaPago"
                    type="date"
                    value={formData.fechaPago}
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
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="PAGADO">PAGADO</option>
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
