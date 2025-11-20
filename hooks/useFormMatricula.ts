'use client';

import { useState, useEffect } from 'react';
import type { Alumno, Grado, Matricula } from '@/types/types';
import { createHandleChange } from '@/utils/formHelpers';


export function useFormMatricula() {
  const [alumno, setAlumno] = useState<Alumno[]>([]);
  const [grado, setGrado] = useState<Grado[]>([]);
  const [formMatricula, setFormMatricula] = useState<Matricula>({
    id_alumno: '',
    id_grado: '',
    anio_lectivo: '',
    fecha_matricula:new Date().toLocaleDateString(),
    estado: 'ACTIVO'
  });

  useEffect(() => {
    fetch('/api/alumno')
      .then(res => res.json())
      .then(data => setAlumno(data))
      .catch(err => console.error('Error al cargar alumno:', err));
  }, []);

    useEffect(() => {
    fetch('/api/grado')
      .then(res => res.json())
      .then(data => setGrado(data))
      .catch(err => console.error('Error al cargar grado:', err));
  }, []);

  const handleChange = createHandleChange(setFormMatricula);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/matricula', {
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
    alumno,
    grado,
    handleChange,
    handleSubmit,
  };
}
