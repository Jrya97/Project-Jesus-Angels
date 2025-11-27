'use client';

import { useState, useEffect } from 'react';
import type { Alumno } from '@/types/types';

export function useEditAlumno(initialAlumno: Alumno | undefined) {
  const [alumnoData, setAlumnoData] = useState<Alumno | undefined>(initialAlumno);
  useEffect(() => {
    setAlumnoData(initialAlumno);
  }, [initialAlumno]);

  const updateAlumno = (updatedAlumno: Alumno) => {
    setAlumnoData(updatedAlumno);
  };

  const handleSave = async (updatedAlumno: Alumno) => {
    try {
      const id = updatedAlumno.idAlumno
      if (!id) {
        console.error('Error: No se encontró el ID del alumno para actualizar');
        return false;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alumnos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlumno),
      });

      if (res.ok) {
        updateAlumno(updatedAlumno);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      return false;
    }
  };

  return {
    alumnoData,
    updateAlumno,
    handleSave,
  };
}
