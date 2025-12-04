'use client';

import { useState, useEffect } from 'react';
import type { Alumno, Apoderado } from '@/types/types';
import { getApoderados } from '@/utils/getFetch';
import { createHandleChangeAlumno } from '@/utils/formHelpersAlumno';

export function useFormAlumno() {
  const [apoderados, setApoderados] = useState<Apoderado[]>([]);
  const [formAlumno, setFormAlumno] = useState<Alumno>({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    direccion: '',
    apoderado: { idApoderado: 1 }
  });

  useEffect(() => {
    const fetchApoderados = async () => {
      const dataApoderados = await getApoderados();
      setApoderados(dataApoderados);
    };
    fetchApoderados();
  }, []);

  const handleChange = createHandleChangeAlumno(setFormAlumno);

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
