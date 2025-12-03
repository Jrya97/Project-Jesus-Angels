'use client';

import { useState, useEffect } from 'react';
import type { Alumno, Apoderado } from '@/types/types';
import { createHandleChange } from '@/utils/formHelpers';
<<<<<<< HEAD:hooks/useFromAlumno.ts

=======
import { getApoderados } from '@/utils/getFetch';
>>>>>>> dev:hooks/useFormAlumno.ts

export function useFormAlumno() {
  const [apoderados, setApoderados] = useState<Apoderado[]>([]);
  const [formAlumno, setFormAlumno] = useState<Alumno>({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    direccion: '',
    idApoderado: 0
  });

  useEffect(() => {
    const fetchApoderados = async () => {
      const dataApoderados = await getApoderados();
      setApoderados(dataApoderados);
    };
    fetchApoderados();
  }, []);

  const handleChange = createHandleChange(setFormAlumno);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formAlumno),
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
    formAlumno,
    apoderados,
    handleChange,
    handleSubmit,
  };
}
