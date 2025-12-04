'use client';

import { useState, useEffect } from 'react';
import type { Alumno, Grado, Matricula } from '@/types/types';
import { createHandleChange } from '@/utils/formHelpers';
import { getAlumnos, getGrados } from '@/utils/getFetch';
import { createHandleChangeAlumno } from '@/utils/formHelpersAlumno';


export function useFormMatricula() {
  const [alumnos, setAlumno] = useState<Alumno[]>([]);
  const [grados, setGrado] = useState<Grado[]>([]);
  const [formMatricula, setFormMatricula] = useState<Matricula>({
    alumno: { idAlumno: 0 },
    grado: { idGrado: 0 },
    anioLectivo: new Date().getFullYear().toString(),
    fechaMatricula: new Date().toLocaleDateString(),
    estado: 'ACTIVO'
  });

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const dataAlumnos = await getAlumnos();
        const dataGrados = await getGrados();

        if (dataAlumnos && Array.isArray(dataAlumnos)) {
          const alumnosOrdenados = [...dataAlumnos].sort((a, b) => {
            const idA = a.idAlumno || (a as any).id_alumno || 0;
            const idB = b.idAlumno || (b as any).id_alumno || 0;
            return idA - idB;
          });
          setAlumno(alumnosOrdenados);
        } else {
          setAlumno([]);
        }

        if (dataGrados && Array.isArray(dataGrados)) {
          setGrado(dataGrados);
        } else {
          setGrado([]);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setAlumno([]);
        setGrado([]);
      }
    };
    fetchAlumnos();
  }, []);


  const handleChange = createHandleChangeAlumno(setFormMatricula);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formMatricula),
      });

      if (res.ok) {
        alert('Alumno registrado');
      } else {
        alert('Error al registrar alumno');
      }
    } catch (error) {
      console.error('Error en el envío:', error);
      alert('Error al registrar alumno');
    }
  };

  return {
    formMatricula,
    alumnos,
    grados,
    handleChange,
    handleSubmit,
  };
}
