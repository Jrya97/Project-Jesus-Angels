'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Asistencia, Grado, Matricula } from '@/types/types';
import { getAsistencia, getGrados, getMatriculas } from '@/utils/getFetch';
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function HistorialAsistenciaPage() {
    const router = useRouter();
    const [grados, setGrados] = useState<Grado[]>([]);
    const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null);
    const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [selectedFecha, setSelectedFecha] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingEstado, setEditingEstado] = useState<'PRESENTE' | 'AUSENTE'>('PRESENTE');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [dataGrados, dataAsistencias, dataMatriculas] = await Promise.all([
                    getGrados(),
                    getAsistencia(),
                    getMatriculas()
                ]);

                if (dataGrados && Array.isArray(dataGrados)) {
                    const gradosOrdenados = dataGrados.sort((a, b) => a.idGrado - b.idGrado);
                    setGrados(gradosOrdenados);
                }

                if (dataAsistencias && Array.isArray(dataAsistencias)) {
                    setAsistencias(dataAsistencias);
                }

                if (dataMatriculas && Array.isArray(dataMatriculas)) {
                    setMatriculas(dataMatriculas);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Obtener fechas únicas de las asistencias filtradas por grado, ordenadas por ID descendente
    const fechasDisponibles = selectedGrado
        ? (() => {
            // Filtrar asistencias por grado
            const asistenciasPorGrado = asistencias.filter(a => {
                const matriculaAlumno = matriculas.find(
                    m => m.alumno?.idAlumno === a.alumno?.idAlumno && m.estado === 'ACTIVO'
                );
                return matriculaAlumno?.grado?.idGrado === selectedGrado.idGrado;
            });

            // Ordenar por ID descendente
            const asistenciasOrdenadas = asistenciasPorGrado.sort((a, b) =>
                (b.idAsistencia || 0) - (a.idAsistencia || 0)
            );

            // Extraer fechas únicas manteniendo el orden
            const fechasUnicas: string[] = [];
            asistenciasOrdenadas.forEach(a => {
                if (!fechasUnicas.includes(a.fecha)) {
                    fechasUnicas.push(a.fecha);
                }
            });

            return fechasUnicas;
        })()
        : [];

    // Filtrar asistencias por grado y fecha
    const asistenciasFiltradas = selectedGrado
        ? asistencias.filter(a => {
            const matriculaAlumno = matriculas.find(
                m => m.alumno?.idAlumno === a.alumno?.idAlumno && m.estado === 'ACTIVO'
            );
            const matchGrado = matriculaAlumno?.grado?.idGrado === selectedGrado.idGrado;
            const matchFecha = selectedFecha ? a.fecha === selectedFecha : true;
            return matchGrado && matchFecha;
        })
        : [];

    // Guardar cambio de estado
    const handleSaveEdit = async (idAsistencia: number) => {
        try {
            // Encontrar la asistencia completa
            const asistenciaActual = asistencias.find(a => a.idAsistencia === idAsistencia);

            if (!asistenciaActual) {
                alert('Error: No se encontró el registro de asistencia');
                return;
            }

            // Crear objeto con todos los campos necesarios
            const asistenciaActualizada = {
                idAsistencia: asistenciaActual.idAsistencia,
                alumno: asistenciaActual.alumno,
                fecha: asistenciaActual.fecha,
                estado: editingEstado
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/asistencia/${idAsistencia}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(asistenciaActualizada),
            });

            if (res.ok) {
                // Actualizar el estado local
                setAsistencias(prev =>
                    prev.map(a =>
                        a.idAsistencia === idAsistencia ? { ...a, estado: editingEstado } : a
                    )
                );
                setEditingId(null);
                alert('Estado actualizado exitosamente');
            } else {
                const errorText = await res.text();
                console.error('Error del servidor:', errorText);
                alert(`Error al actualizar el estado: ${res.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error al actualizar el estado: ${error}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl font-semibold text-gray-600">Cargando...</div>
            </div>
        );
    }

    return (
        <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8">
            {/* Header con botón de regreso */}
            <section className="w-full max-w-6xl">
                <button
                    onClick={() => router.push('/admin/asistencia')}
                    className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Volver a Registro de Asistencia
                </button>
                <h1 className="text-4xl font-bold text-gray-800">Historial de Asistencia</h1>
            </section>

            {!selectedGrado ? (
                /* Vista de Cards de Grados */
                <section className="w-full max-w-6xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Selecciona un Grado</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {grados.map((grado) => (
                            <div
                                key={grado.idGrado}
                                onClick={() => setSelectedGrado(grado)}
                                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-indigo-500"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {grado.nombre}
                                </h3>
                                <p className="text-gray-600">{grado.nivel}</p>
                                <div className="mt-4 text-indigo-600 font-semibold">
                                    Ver Historial →
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                /* Vista de Tabla de Asistencias */
                <section className="w-full max-w-6xl">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700">
                                {selectedGrado.nombre} - {selectedGrado.nivel}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Total de registros: {asistenciasFiltradas.length}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedGrado(null);
                                setSelectedFecha('');
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cambiar Grado
                        </button>
                    </div>

                    {/* Filtro de Fecha */}
                    <div className="mb-6 bg-white/60 rounded-md py-4 px-6 shadow-md">
                        <label htmlFor="fecha" className="block text-sm font-semibold text-gray-700 mb-2">
                            Filtrar por Fecha
                        </label>
                        <select
                            id="fecha"
                            value={selectedFecha}
                            onChange={(e) => setSelectedFecha(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-full md:w-auto"
                        >
                            <option value="">Todas las fechas</option>
                            {fechasDisponibles.map((fecha) => {
                                // Convertir fecha de YYYY-MM-DD a formato legible sin conversión de zona horaria
                                const [year, month, day] = fecha.split('-');
                                const fechaObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });
                                return (
                                    <option key={fecha} value={fecha}>
                                        {fechaFormateada}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {asistenciasFiltradas.length === 0 ? (
                        <div className="text-center text-gray-600 text-lg bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200">
                            <p className="text-xl font-semibold mb-2">⚠️ No hay registros</p>
                            <p>No se encontraron registros de asistencia para este grado{selectedFecha && ' en la fecha seleccionada'}</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Alumno
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {asistenciasFiltradas.map((asistencia, index) => (
                                        <tr
                                            key={asistencia.idAsistencia || index}
                                            className={`${asistencia.estado === 'PRESENTE'
                                                ? 'bg-green-50'
                                                : asistencia.estado === 'AUSENTE'
                                                    ? 'bg-red-50'
                                                    : index % 2 === 0
                                                        ? 'bg-white'
                                                        : 'bg-gray-50'
                                                }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {asistencia.alumno?.apellido}, {asistencia.alumno?.nombre}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">
                                                    {asistencia.fecha.split('-').reverse().join('/')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === asistencia.idAsistencia ? (
                                                    <select
                                                        value={editingEstado}
                                                        onChange={(e) => setEditingEstado(e.target.value as 'PRESENTE' | 'AUSENTE')}
                                                        className="px-3 py-1 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="PRESENTE">PRESENTE</option>
                                                        <option value="AUSENTE">AUSENTE</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${asistencia.estado === 'PRESENTE'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {asistencia.estado}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === asistencia.idAsistencia ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleSaveEdit(asistencia.idAsistencia!)}
                                                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-1"
                                                        >
                                                            <FaSave /> Guardar
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors flex items-center gap-1"
                                                        >
                                                            <FaTimes /> Cancelar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(asistencia.idAsistencia!);
                                                            setEditingEstado(asistencia.estado as 'PRESENTE' | 'AUSENTE');
                                                        }}
                                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                                    >
                                                        <FaEdit /> Editar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}
        </article>
    );
}
