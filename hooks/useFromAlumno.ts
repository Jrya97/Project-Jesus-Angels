'use client';

import { useState, useEffect } from 'react';
import type { Alumno, Apoderado } from '@/types/types';
import { createHandleChange } from '@/utils/formHelpers';


export function useFormAlumno() {
  const [apoderados, setApoderados] = useState<Apoderado[]>([]);
  const [formAlumno, setFormAlumno] = useState<Alumno>({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    direccion: '',
    id_apoderado: '',
  });

  useEffect(() => {
    fetch('/api/apoderado')
      .then(res => res.json())
      .then(data => setApoderados(data))
      .catch(err => console.error('Error al cargar apoderados:', err));
  }, []);

  const handleChange = createHandleChange(setFormAlumno);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/alumno', {
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
