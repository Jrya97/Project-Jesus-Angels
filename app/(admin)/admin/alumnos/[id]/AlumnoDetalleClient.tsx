"use client";

import { AlumnosFake, ApoderadosFake } from "@/data/fakeData";
import {
    FaUser,
    FaIdCard,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaBook,
    FaUsers,
    FaPhone,
    FaEnvelope,
    FaInbox,
    FaEdit
} from "react-icons/fa";
import { InformacionCard } from "@/app/components/ui/informacionCard";
import { InformacionItem } from "@/app/components/ui/informacionItem";
import { EstadoVacio } from "@/app/components/ui/estadovacio";
import { Modal } from "@/app/components/ui/modal";
import { EditarAlumnoForm } from "@/app/components/forms/EditarAlumnoForm";
import { EditarApoderadoForm } from "@/app/components/forms/EditarApoderadoForm";
import { SecondButton } from "@/app/components/ui/SecondButton";
import { useModal } from "@/hooks/useModal";
import { useEditAlumno } from "@/hooks/useEditAlumno";
import { useEditApoderado } from "@/hooks/useEditApoderado";
import FallaAlumno from "@/app/components/view/fallaAlumno";

interface AlumnoDetalleClientProps {
    id: string;
}

export default function AlumnoDetalleClient({ id }: AlumnoDetalleClientProps) {
    const initialAlumno = AlumnosFake.find((a) => a.id_alumno === id);
    const initialApoderado = ApoderadosFake.find((a) => a.id_apoderado === initialAlumno?.id_apoderado);

    const { alumnoData, handleSave: handleSaveAlumno } = useEditAlumno(initialAlumno);
    const { apoderadoData, handleSave: handleSaveApoderado } = useEditApoderado(initialApoderado);

    const alumnoModal = useModal();
    const apoderadoModal = useModal();

    const onSaveAlumno = async (updatedAlumno: typeof alumnoData) => {
        if (updatedAlumno) {
            const success = await handleSaveAlumno(updatedAlumno);
            if (success) alumnoModal.closeModal();
        }
    };

    const onSaveApoderado = async (updatedApoderado: typeof apoderadoData) => {
        if (updatedApoderado) {
            const success = await handleSaveApoderado(updatedApoderado);
            if (success) apoderadoModal.closeModal();
        }
    };

    if (!alumnoData) {
        return <FallaAlumno id={id} />
    }

    return (
        <>
            <div className="w-full max-w-5xl mx-auto relative z-10 p-4 md:p-8">
                <div className="bg-white/85 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                            <FaUser className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-600">Información del Estudiante</p>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 truncate">
                                {alumnoData.apellido}, {alumnoData.nombre}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <InformacionCard
                        title="Datos Personales"
                        icon={FaUser}
                        actionButton={
                            <SecondButton
                                onClick={alumnoModal.openModal}
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <FaEdit className="w-4 h-4" />
                                Editar Datos Personales
                            </SecondButton>
                        }
                    >
                        <InformacionItem icon={FaIdCard} label="DNI" value={alumnoData.dni} />
                        <InformacionItem icon={FaMapMarkerAlt} label="Dirección" value={alumnoData.direccion} />
                        <InformacionItem icon={FaCalendarAlt} label="Fecha de Nacimiento" value={alumnoData.fecha_nacimiento} />
                        <InformacionItem icon={FaBook} label="Grado" value={alumnoData.id_apoderado} />
                    </InformacionCard>

                    <InformacionCard
                        title="Apoderado"
                        icon={FaUsers}
                        actionButton={
                            apoderadoData && (
                                <SecondButton
                                    onClick={apoderadoModal.openModal}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <FaEdit className="w-4 h-4" />
                                    Editar Datos del Apoderado
                                </SecondButton>
                            )
                        }
                    >
                        {apoderadoData ? (
                            <>
                                <InformacionItem icon={FaUser} label="Nombre Completo" value={apoderadoData.nombre} />
                                <InformacionItem icon={FaIdCard} label="DNI" value={apoderadoData.dni} />
                                <InformacionItem icon={FaPhone} label="Teléfono" value={apoderadoData.telefono} />
                                <InformacionItem icon={FaEnvelope} label="Correo Electrónico" value={apoderadoData.correo_electronico} breakAll />
                            </>
                        ) : (
                            <EstadoVacio icon={FaInbox} message="No hay información del apoderado disponible" />
                        )}
                    </InformacionCard>
                </div>
            </div>

            <Modal
                isOpen={alumnoModal.isOpen}
                onClose={alumnoModal.closeModal}
                title="Editar Datos del Alumno"
            >
                <EditarAlumnoForm
                    alumno={alumnoData}
                    onSave={onSaveAlumno}
                    onCancel={alumnoModal.closeModal}
                />
            </Modal>

            {apoderadoData && (
                <Modal
                    isOpen={apoderadoModal.isOpen}
                    onClose={apoderadoModal.closeModal}
                    title="Editar Datos del Apoderado"
                >
                    <EditarApoderadoForm
                        apoderado={apoderadoData}
                        onSave={onSaveApoderado}
                        onCancel={apoderadoModal.closeModal}
                    />
                </Modal>
            )}
        </>
    );
}
