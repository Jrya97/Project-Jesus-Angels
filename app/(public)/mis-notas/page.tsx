'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { getAlumnos, getNotasByAlumno, getPerfiles, getCursos } from '@/utils/getFetch';
import type { Alumno, Nota, Perfil, curso } from '@/types/types';

export default function MisNotasPage() {
    const router = useRouter();
    const [dni, setDni] = useState('');
    const [namePrefix, setNamePrefix] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [alumno, setAlumno] = useState<Alumno | null>(null);
    const [notas, setNotas] = useState<Nota[]>([]);
    const [perfilesMap, setPerfilesMap] = useState<Record<string, string>>({});
    const [cursosMap, setCursosMap] = useState<Record<number, string>>({});

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAlumno(null);
        setNotas([]);

        try {
            // 1. Validar inputs
            if (namePrefix.length < 2) {
                setError('Ingresa al menos 2 letras del nombre.');
                setLoading(false);
                return;
            }

            // 2. Buscar alumno
            const alumnos = await getAlumnos();
            if (!alumnos || !Array.isArray(alumnos)) {
                setError('Error al conectar con la base de datos de alumnos.');
                setLoading(false);
                return;
            }

            const alumnoFound = alumnos.find((a: Alumno) =>
                a.dni === dni &&
                a.nombre.toUpperCase().startsWith(namePrefix.toUpperCase())
            );

            if (!alumnoFound) {
                setError('No se encontró ningún alumno con esos datos. Verifica el DNI y las iniciales.');
                setLoading(false);
                return;
            }

            setAlumno(alumnoFound);

            // 3. Buscar notas y cursos
            const [dataNotas, dataPerfiles, dataCursos] = await Promise.all([
                getNotasByAlumno(alumnoFound.idAlumno!),
                getPerfiles(),
                getCursos()
            ]);

            if (dataNotas && Array.isArray(dataNotas)) {
                setNotas(dataNotas);
            }

            // Mapear perfiles para mostrar nombre del profesor/registrador
            if (dataPerfiles && Array.isArray(dataPerfiles)) {
                const pMap: Record<string, string> = {};
                dataPerfiles.forEach((p: Perfil) => {
                    if (p.id) pMap[p.id] = p.nombre;
                });
                setPerfilesMap(pMap);
            }

            // Mapear cursos (aunque la nota ya trae curso, a veces es bueno tenerlo de respaldo)
            if (dataCursos && Array.isArray(dataCursos)) {
                const cMap: Record<number, string> = {};
                dataCursos.forEach((c: curso) => {
                    if (c.idCurso) cMap[c.idCurso] = c.nombre;
                });
                setCursosMap(cMap);
            }

        } catch (err) {
            console.error(err);
            setError('Ocurrió un error inesperado al consultar las notas.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[url('/Fondo.jpg')] bg-cover bg-center flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 flex flex-col gap-6 animate-zoom-in">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium transition-colors">
                        <FaArrowLeft /> Volver al Inicio
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Consulta de Notas</h1>
                </div>

                {/* Formulario de Búsqueda */}
                {!alumno ? (
                    <section className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-inner border border-gray-100 animate-slide-up">
                        <p className="text-gray-600 text-sm mb-2">
                            Ingresa tu DNI y tu codigo.
                        </p>
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">DNI</label>
                                <input
                                    type="text"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    placeholder="Ej: 70809010"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Codigo</label>
                                <input
                                    type="text"
                                    value={namePrefix}
                                    onChange={(e) => setNamePrefix(e.target.value)}
                                    placeholder="xxxx"
                                    maxLength={2}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
                                    required
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? 'Buscando...' : <><FaSearch /> Consultar</>}
                                </button>
                            </div>
                        </form>
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </section>
                ) : (
                    /* Resultados */
                    <section className="flex flex-col gap-6 animate-fade-in">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex justify-between items-center flex-wrap gap-4 animate-slide-down">
                            <div>
                                <h2 className="text-xl font-bold text-indigo-900">{alumno.nombre} {alumno.apellido}</h2>
                                <p className="text-indigo-700 text-sm">DNI: {alumno.dni}</p>
                            </div>
                            <button
                                onClick={() => { setAlumno(null); setNotas([]); setDni(''); setNamePrefix(''); }}
                                className="text-sm bg-white text-indigo-600 px-3 py-1 rounded-md border border-indigo-200 hover:bg-indigo-50"
                            >
                                Nueva Consulta
                            </button>
                        </div>

                        {notas.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                No se encontraron notas registradas para este alumno.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse bg-white rounded-lg shadow-sm overflow-hidden text-sm md:text-base">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="p-3 font-semibold">Curso</th>
                                            <th className="p-3 font-semibold">Tipo</th>
                                            <th className="p-3 font-semibold text-center">Nota</th>
                                            <th className="p-3 font-semibold">Fecha</th>
                                            <th className="p-3 font-semibold hidden md:table-cell">Registrado Por</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {notas.map((nota, idx) => (
                                            <tr key={nota.idNota || idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-3 font-medium text-gray-800">
                                                    {nota.curso?.nombre || cursosMap[nota.curso?.idCurso] || 'Curso Desconocido'}
                                                </td>
                                                <td className="p-3 text-gray-600 capitalize">
                                                    {nota.tipoNota.toLowerCase()}
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className={`px-2 py-1 rounded font-bold ${nota.nota >= 11 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {nota.nota}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-gray-500">
                                                    {nota.fechaRegistro?.split('T')[0].split('-').reverse().join('/')}
                                                </td>
                                                <td className="p-3 text-gray-500 hidden md:table-cell text-xs">
                                                    {perfilesMap[nota.idUsuarioRegistro as any] || 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

            </div>
        </main>
    );
}
