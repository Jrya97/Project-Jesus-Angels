'use client';

<<<<<<< HEAD
import { useState } from 'react';
import type { Alumno } from '@/types/types';

export function useEditAlumno(initialAlumno: Alumno | undefined) {
  const [alumnoData, setAlumnoData] = useState(initialAlumno);

  const updateAlumno = (updatedAlumno: Alumno) => {
    setAlumnoData(updatedAlumno);
    // Aquí agregar una llamada a la API para guardar los cambios
    console.log("Alumno actualizado:", updatedAlumno);
=======
import { useState, useEffect } from 'react';
import type { Alumno } from '@/types/types';

export function useEditAlumno(initialAlumno: Alumno | undefined) {
  const [alumnoData, setAlumnoData] = useState<Alumno | undefined>(initialAlumno);
  useEffect(() => {
    setAlumnoData(initialAlumno);
  }, [initialAlumno]);

  const updateAlumno = (updatedAlumno: Alumno) => {
    setAlumnoData(updatedAlumno);
>>>>>>> dev
  };

  const handleSave = async (updatedAlumno: Alumno) => {
    try {
<<<<<<< HEAD
      // const res = await fetch(`/api/alumno/${updatedAlumno.id_alumno}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedAlumno),
      // });
      // if (res.ok) {
      //   updateAlumno(updatedAlumno);
      //   return true;
      // }
      // return false;
      
      updateAlumno(updatedAlumno);
      return true;
=======
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
>>>>>>> dev
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
