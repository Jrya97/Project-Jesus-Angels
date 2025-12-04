"use client";

import { FaUser, FaBook, FaCalendarAlt } from "react-icons/fa";
import { useFormPago } from "@/hooks/useFormPago";
import { InputFormAdmin } from "../ui/labelFormularioAdmin";
import { SecondButton } from "../ui/SecondButton";
import { useFormMatricula } from "@/hooks/useFormMatricula";

import { MdOutlineAttachMoney } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";

export default function FormPago() {
    const { alumnos } = useFormMatricula();
    const { formPago, handleChange, handleSubmit } = useFormPago();

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccione el alumno
                </label>
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
                    <select
                        name="alumno.idAlumno"
                        value={formPago.alumno.idAlumno}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
                                border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
                                transition-all outline-none appearance-none bg-white/50 "
                    >
                        <option value="">Seleccione un alumno</option>
                        {alumnos.map((a) => (
                            <option key={a.idAlumno} value={a.idAlumno}>
                                {a.nombre} {a.apellido} - DNI: {a.dni}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Pago
                </label>

                <div className="relative">
                    <GoListOrdered className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />

                    <select
                        name="tipo"
                        value={formPago.tipo}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
                border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
                transition-all outline-none appearance-none bg-white/50 "
                    >
                        <option value="MATRICULA">MATRICULA</option>
                        <option value="MENSUALIDAD">MENSUALIDAD</option>
                    </select>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mes
                </label>

                <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />

                    <select
                        name="mes"
                        value={formPago.mes || ""}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
                border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
                transition-all outline-none appearance-none bg-white/50 "
                    >
                        <option value="">Seleccionar Mes</option>
                        {[
                            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
                            "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
                        ].map((mes) => (
                            <option key={mes} value={mes}>{mes}</option>
                        ))}
                    </select>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <InputFormAdmin
                label="Monto"
                name="monto"
                placeholder="Monto a pagar"
                value={formPago.monto}
                onChange={handleChange}
                required
                icon={<MdOutlineAttachMoney />}
                type="number"
            />

            <InputFormAdmin
                label="Año por el cual se realiza el pago"
                name="anioPago"
                placeholder="Año"
                value={formPago.anioPago}
                onChange={handleChange}
                required
                icon={<FaCalendarAlt />}
                type="number"
            />

            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado del Pago
                </label>

                <div className="relative">
                    <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />

                    <select
                        name="estado"
                        value={formPago.estado}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border
                border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent 
                transition-all outline-none appearance-none bg-white/50 "
                    >
                        <option value="PAGADO">PAGADO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                    </select>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <SecondButton type="submit">Realizar Pago</SecondButton>
        </form>
    );
}