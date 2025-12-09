'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Matricula } from '@/types/types';
import { getMatriculas } from '@/utils/getFetch';

type EstadoAsistencia = 'PRESENTE' | 'AUSENTE' | '';

interface MatriculaConAsistencia extends Matricula {
    estadoAsistencia: EstadoAsistencia;
}

export function useAsistencia() {
    const [matriculas, setMatriculas] = useState<MatriculaConAsistencia[]>([]);
    const [selectedGrado, setSelectedGrado] = useState<string>('');
    const [selectedAnioLectivo, setSelectedAnioLectivo] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const dataMatriculas = await getMatriculas();

                if (dataMatriculas && Array.isArray(dataMatriculas)) {
                    // Filtrar solo matrículas con estado ACTIVO
                    const matriculasActivas = dataMatriculas.filter(m => m.estado === 'ACTIVO');

                    const matriculasConEstado = matriculasActivas.map(matricula => ({
                        ...matricula,
                        estadoAsistencia: '' as EstadoAsistencia
                    }));
                    setMatriculas(matriculasConEstado);
                } else {
                    setMatriculas([]);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setMatriculas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Obtener grados únicos
    const grados = useMemo(() => {
        const gradosMap = new Map();
        matriculas.forEach(m => {
            if (m?.grado?.idGrado) {
                gradosMap.set(m.grado.idGrado, m.grado);
            }
        });
        // Ordenar por idGrado
        return Array.from(gradosMap.values()).sort((a: any, b: any) => a.idGrado - b.idGrado);
    }, [matriculas]);

    // Obtener años lectivos únicos
    const aniosLectivos = useMemo(() => {
        const aniosSet = new Set<number>();

        matriculas.forEach(m => {
            if (m?.anioLectivo != null) {
                // Convertir a número si es string
                const anio = typeof m.anioLectivo === 'string'
                    ? parseInt(m.anioLectivo, 10)
                    : m.anioLectivo;
                aniosSet.add(anio);
            }
        });

        const aniosArray = Array.from(aniosSet);

        // Orden numérico descendente
        return aniosArray.sort((a, b) => b - a);
    }, [matriculas]);

    // Filtrar matrículas según los filtros seleccionados
    const matriculasConAsistencia = useMemo(() => {
        let filtered = matriculas;

        if (selectedGrado) {
            filtered = filtered.filter(m => m?.grado?.idGrado === parseInt(selectedGrado));
        }

        if (selectedAnioLectivo) {
            filtered = filtered.filter(m => {
                const anioMatricula = typeof m?.anioLectivo === 'string'
                    ? parseInt(m.anioLectivo, 10)
                    : m?.anioLectivo;
                const anioSeleccionado = parseInt(selectedAnioLectivo, 10);
                return anioMatricula === anioSeleccionado;
            });
        }

        return filtered;
    }, [matriculas, selectedGrado, selectedAnioLectivo]);

    // Actualizar estado de asistencia de un alumno
    const setEstadoAsistencia = (idAlumno: number, estado: EstadoAsistencia) => {
        setMatriculas(prev =>
            prev.map(matricula =>
                matricula.alumno.idAlumno === idAlumno
                    ? { ...matricula, estadoAsistencia: estado }
                    : matricula
            )
        );
    };

    // Enviar asistencias en batch
    const submitAsistencias = async () => {
        const asistenciasParaEnviar = matriculasConAsistencia
            .filter(matricula => matricula.estadoAsistencia !== '')
            .map(matricula => ({
                alumno: { idAlumno: matricula.alumno.idAlumno },
                fecha: new Date().toISOString().split('T')[0],
                estado: matricula.estadoAsistencia
            }));

        if (asistenciasParaEnviar.length === 0) {
            alert('Por favor, marca al menos un alumno con estado de asistencia');
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/asistencia/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(asistenciasParaEnviar),
            });

            if (res.ok) {
                alert(`Asistencia registrada exitosamente para ${asistenciasParaEnviar.length} alumno(s)`);
                setMatriculas(prev =>
                    prev.map(matricula => ({ ...matricula, estadoAsistencia: '' as EstadoAsistencia }))
                );
            } else {
                const errorData = await res.text();
                alert(`Error al registrar asistencia: ${errorData}`);
            }
        } catch (error) {
            console.error('Error en el envío:', error);
            alert('Error al registrar asistencia');
        } finally {
            setSubmitting(false);
        }
    };

    return {
        matriculasConAsistencia,
        grados,
        aniosLectivos,
        selectedGrado,
        selectedAnioLectivo,
        setSelectedGrado,
        setSelectedAnioLectivo,
        setEstadoAsistencia,
        submitAsistencias,
        loading,
        submitting
    };
}
