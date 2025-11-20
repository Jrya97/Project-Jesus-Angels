'use client';

import { useState } from 'react';
import type { Alumno } from '@/types/types';

export function useEditAlumno(initialAlumno: Alumno | undefined) {
  const [alumnoData, setAlumnoData] = useState(initialAlumno);

  const updateAlumno = (updatedAlumno: Alumno) => {
    setAlumnoData(updatedAlumno);
    // Aquí agregar una llamada a la API para guardar los cambios
    console.log("Alumno actualizado:", updatedAlumno);
  };

  const handleSave = async (updatedAlumno: Alumno) => {
    try {
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
