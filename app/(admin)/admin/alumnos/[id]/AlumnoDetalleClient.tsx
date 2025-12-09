"use client";

import { useState, useEffect } from "react";
import { getAlumnoById, getMatriculaByIdAlumnos, getPagoByIdAlumno, getNotasByAlumno, getPerfiles } from "@/utils/getFetch";
import type { Alumno, Apoderado, Grado, Matricula, Pago, Nota, Perfil } from "@/types/types";
import { GiReceiveMoney } from "react-icons/gi";
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
    FaEdit,
    FaPaperclip,
    FaGraduationCap
} from "react-icons/fa";
import { InformacionCard } from "@/app/components/ui/informacionCard";
import { InformacionItem } from "@/app/components/ui/informacionItem";
import { EstadoVacio } from "@/app/components/ui/estadovacio";
import { Modal } from "@/app/components/ui/modal";
import { EditarAlumnoForm } from "@/app/components/forms/EditarAlumnoForm";
import { EditarApoderadoForm } from "@/app/components/forms/EditarApoderadoForm";
import { EditarPagoForm } from "@/app/components/forms/EditarPagoForm";
import { EditarNotaForm } from "@/app/components/forms/EditarNotaForm";
import { SecondButton } from "@/app/components/ui/SecondButton";
import { useModal } from "@/hooks/useModal";
import { useEditAlumno } from "@/hooks/useEditAlumno";
import { useEditApoderado } from "@/hooks/useEditApoderado";
import FallaAlumno from "@/app/components/view/fallaAlumno";
import { useEditPago } from "@/hooks/useEditPago";
import { useEditMatricula } from "@/hooks/useEditMatricula";
import { EditarMatriculaForm } from "@/app/components/forms/EditarMatriculaForm";

interface AlumnoDetalleClientProps {
    id: string;
}

export default function AlumnoDetalleClient({ id }: AlumnoDetalleClientProps) {
    const [initialAlumno, setInitialAlumno] = useState<Alumno | undefined>(undefined);
    const [initialApoderado, setInitialApoderado] = useState<Apoderado | undefined>(undefined);
    const [initialMatricula, setInitialMatricula] = useState<Matricula[]>([]);
    const [initialPago, setInitialPago] = useState<Pago[]>([]);
    const [selectedPago, setSelectedPago] = useState<Pago | undefined>(undefined);
    const [selectedMatricula, setSelectedMatricula] = useState<Matricula | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    // Estados para notas
    const [showNotasModal, setShowNotasModal] = useState(false);
    const [showEditarNotaModal, setShowEditarNotaModal] = useState(false);
    const [selectedNota, setSelectedNota] = useState<Nota | null>(null);
    const [alumnoNotas, setAlumnoNotas] = useState<Nota[]>([]);
    const [perfilesMap, setPerfilesMap] = useState<Record<string, string>>({});

    const { alumnoData, handleSave: handleSaveAlumno } = useEditAlumno(initialAlumno);
    const { apoderadoData, handleSave: handleSaveApoderado } = useEditApoderado(initialApoderado);
    const { pagoData, handleSave: handleSavePago } = useEditPago(selectedPago);
    const { matriculaData, handleSave: handleSaveMatricula } = useEditMatricula(selectedMatricula);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const alumnoId = Number(id);

                const alumno = await getAlumnoById(alumnoId);
                setInitialAlumno(alumno || undefined);

                if (alumno?.apoderado) {
                    setInitialApoderado(alumno.apoderado);
                }

                const matriculaResponse = await getMatriculaByIdAlumnos(alumnoId)

                const matriculas = Array.isArray(matriculaResponse) ? matriculaResponse : (matriculaResponse ? [matriculaResponse] : []);
                setInitialMatricula(matriculas);

                const pagoResponse = await getPagoByIdAlumno(alumnoId)
                setInitialPago(Array.isArray(pagoResponse) ? pagoResponse : []);

            } catch (error) {
                console.error('Error cargando datos del alumno:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const alumnoModal = useModal();
    const apoderadoModal = useModal();
    const pagoModal = useModal();
    const matriculaModal = useModal();

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

    const onSavePago = async (updatedPago: Pago) => {
        if (!updatedPago) return;

        const success = await handleSavePago(updatedPago);
        if (!success) return;
        setInitialPago(prev =>
            prev.map(p => p.idPago === updatedPago.idPago ? updatedPago : p)
        );

        setSelectedPago(undefined);
        pagoModal.closeModal();
    };

    const handleEditPago = (pago: Pago) => {
        setSelectedPago(pago);
        pagoModal.openModal();
    };

    const handleEditMatricula = (matricula: Matricula) => {
        setSelectedMatricula(matricula);
        matriculaModal.openModal();
    };

    const onSaveMatricula = async (updatedMatricula: Matricula) => {
        if (!updatedMatricula) return;

        const success = await handleSaveMatricula(updatedMatricula);
        if (!success) return;

        setInitialMatricula(prev =>
            prev.map(m => m.idMatricula === updatedMatricula.idMatricula ? updatedMatricula : m)
        );

        setSelectedMatricula(undefined);
        matriculaModal.closeModal();
    };


    const handleVerNotas = async () => {
        if (!alumnoData) return;
        setShowNotasModal(true);
        try {
            // Cargar notas y perfiles en paralelo
            const [notas, perfiles] = await Promise.all([
                getNotasByAlumno(Number(id)),
                Object.keys(perfilesMap).length === 0 ? getPerfiles() : Promise.resolve(null)
            ]);

            if (notas && Array.isArray(notas)) {
                setAlumnoNotas(notas);
            } else {
                setAlumnoNotas([]);
            }

            // Procesar perfiles solo si se descargaron nuevos
            if (perfiles && Array.isArray(perfiles)) {
                const map: Record<string, string> = {};
                perfiles.forEach((p: Perfil) => {
                    if (p.id) {
                        map[p.id] = p.nombre;
                    }
                });
                setPerfilesMap(prev => ({ ...prev, ...map }));
            }

        } catch (error) {
            console.error("Error al obtener notas o perfiles", error);
            setAlumnoNotas([]);
        }
    };

    const handleEditarNota = (nota: Nota) => {
        setSelectedNota(nota);
        setShowEditarNotaModal(true);
        // Opcional: Cerrar modal de ver notas
        setShowNotasModal(false);
    };

    const handleSaveNotaEdit = (updatedNota: Nota) => {
        setAlumnoNotas(prev => prev.map(n => n.idNota === updatedNota.idNota ? updatedNota : n));
        setShowEditarNotaModal(false);
        setSelectedNota(null);
        setShowNotasModal(true); // Re-abrir lista
    };

    const handleCancelNotaEdit = () => {
        setShowEditarNotaModal(false);
        setSelectedNota(null);
        setShowNotasModal(true); // Re-abrir lista
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto relative z-10 p-4 md:p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando información del alumno...</p>
                </div>
            </div>
        );
    }

    if (!alumnoData) {
        return <FallaAlumno id={id} />
    }

    return (
        <>
            <div className="w-full max-w-5xl mx-auto relative z-10 p-4 md:p-8">
                <div className="bg-white/85 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                                <FaUser className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Información del Estudiante</p>
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 truncate">
                                    {alumnoData.nombre} {alumnoData.apellido}
                                </h1>
                            </div>
                        </div>
                        <button
                            onClick={handleVerNotas}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
                        >
                            <FaGraduationCap className="w-5 h-5" />
                            Ver Notas
                        </button>
                    </div>
                </div>

                <div className="mb-4 sm:mb-6 md:mb-8">
                    <InformacionCard
                        title="Información de Matrícula"
                        icon={FaPaperclip}
                    >
                        {initialMatricula.length > 0 ? (
                            <div className="space-y-4">
                                {initialMatricula.map((matricula, index) => (
                                    <div key={matricula.idMatricula || index} className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 text-sm border-b last:border-0 pb-4 last:pb-0 border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">Grado:</span>
                                            <span className="font-semibold text-gray-800">{(matricula.grado as any)?.nombre || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">Nivel:</span>
                                            <span className="font-semibold text-gray-800">{(matricula.grado as any)?.nivel || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="text-gray-600">Año:</span>
                                            <span className="font-semibold text-gray-800">{matricula.anioLectivo || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="text-gray-600">Fecha:</span>
                                            <span className="font-semibold text-gray-800">{matricula.fechaMatricula || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaInbox className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="text-gray-600">Estado:</span>
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${matricula.estado === 'ACTIVO'
                                                ? 'bg-green-100 text-green-700'
                                                : matricula.estado === 'RETIRADO'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {matricula.estado}
                                            </span>
                                        </div>
                                        <button
                                            className="flex items-center gap-2 px-3 py-2 bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black rounded-lg transition-colors text-sm font-medium shrink-0 ml-auto"
                                            onClick={() => handleEditMatricula(matricula)}
                                        >
                                            <FaEdit className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EstadoVacio icon={FaInbox} message="No hay información de matrícula disponible" />
                        )}
                    </InformacionCard>
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

                        <InformacionItem icon={FaCalendarAlt} label="Fecha de Nacimiento" value={alumnoData.fechaNacimiento} />
                        <InformacionItem icon={FaBook} label="ID Apoderado" value={String(initialApoderado?.idApoderado)} />
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

                                <InformacionItem icon={FaEnvelope} label="Correo Electrónico" value={apoderadoData.correoElectronico} breakAll />
                            </>
                        ) : (
                            <EstadoVacio icon={FaInbox} message="No hay información del apoderado disponible" />
                        )}
                    </InformacionCard>
                </div>
            </div>

            {/* Pagos del Alumno */}
            <div className="w-full max-w-5xl mx-auto relative z-10 p-4 md:p-8">
                <InformacionCard
                    title="Historial de Pagos"
                    icon={GiReceiveMoney}
                >
                    {Array.isArray(initialPago) && initialPago.length > 0 ? (
                        <ol className="space-y-3">
                            {[...initialPago].sort((a, b) => (b.idPago ?? 0) - (a.idPago ?? 0)).map((pago, index) => (
                                <li
                                    key={pago.idPago}
                                    className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                                            <span className="font-semibold text-gray-700">
                                                #{initialPago.length - index}
                                            </span>
                                            <span className="font-bold text-gray-900">
                                                S/ {Number(pago.monto).toFixed(2)}
                                            </span>
                                            <span className="text-gray-600">
                                                FP: {pago.fechaPago}
                                            </span>
                                            <span className="text-gray-600">
                                                TIPO: {pago.tipo}
                                            </span>
                                            {pago.mes && (
                                                <span className="text-gray-600">
                                                    {pago.mes}
                                                </span>
                                            )}
                                            <span className="text-gray-600">
                                                PERIODO: {pago.anioPago}
                                            </span>

                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${pago.estado === 'PAGADO'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {pago.estado}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center gap-2 px-3 py-2 bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black rounded-lg transition-colors text-sm font-medium shrink-0"
                                        onClick={() => handleEditPago(pago)}
                                    >
                                        <FaEdit className="w-4 h-4" />
                                        <span className="hidden sm:inline">Editar</span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <EstadoVacio icon={FaInbox} message="No hay pagos registrados" />
                    )}
                </InformacionCard>
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

            {selectedPago && (
                <Modal
                    isOpen={pagoModal.isOpen}
                    onClose={() => {
                        pagoModal.closeModal();
                        setSelectedPago(undefined);
                    }}
                    title="Editar Pago"
                >
                    <EditarPagoForm
                        pago={selectedPago}
                        onSave={onSavePago}
                        onCancel={() => {
                            pagoModal.closeModal();
                            setSelectedPago(undefined);
                        }}
                    />
                </Modal>
            )}

            {selectedMatricula && (
                <Modal
                    isOpen={matriculaModal.isOpen}
                    onClose={() => {
                        matriculaModal.closeModal();
                        setSelectedMatricula(undefined);
                    }}
                    title="Editar Matrícula"
                >
                    <EditarMatriculaForm
                        matricula={selectedMatricula}
                        onSave={onSaveMatricula}
                        onCancel={() => {
                            matriculaModal.closeModal();
                            setSelectedMatricula(undefined);
                        }}
                    />
                </Modal>
            )}

            {/* Modal Ver Notas */}
            <Modal
                isOpen={showNotasModal}
                onClose={() => setShowNotasModal(false)}
                title={`Notas de ${alumnoData?.nombre} ${alumnoData?.apellido}`}
            >
                <div className="p-4">
                    {alumnoNotas.length === 0 ? (
                        <p className="text-gray-500 italic">No hay notas registradas.</p>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Curso</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Registrado Por</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {alumnoNotas.map((nota, idx) => {
                                        const registradoPor = perfilesMap[nota.idUsuarioRegistro as any] || 'Desconocido';
                                        return (
                                            <tr key={nota.idNota || idx}>
                                                <td className="px-4 py-2 text-sm">{nota.curso?.nombre}</td>
                                                <td className="px-4 py-2 text-sm font-bold">{nota.nota}</td>
                                                <td className="px-4 py-2 text-sm">{nota.tipoNota}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    {nota.fechaRegistro?.split('T')[0].split('-').reverse().join('/')}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-600">
                                                    {registradoPor}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-center">
                                                    <button
                                                        onClick={() => handleEditarNota(nota)}
                                                        className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase"
                                                    >
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setShowNotasModal(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>

            {showEditarNotaModal && selectedNota && (
                <Modal
                    isOpen={showEditarNotaModal}
                    onClose={handleCancelNotaEdit}
                    title="Editar Nota"
                >
                    <EditarNotaForm
                        nota={selectedNota}
                        onSave={handleSaveNotaEdit}
                        onCancel={handleCancelNotaEdit}
                    />
                </Modal>
            )}
        </>
    );
}
