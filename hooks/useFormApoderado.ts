'use client';
import { useState } from 'react';
import { Apoderado } from '@/types/types';
import { createHandleChange } from '@/utils/formHelpers';

export function useFormApoderado() {
  const [formApoderado, setFormApoderado] = useState<Apoderado>({
    nombre: '',
    dni: '',
    telefono: '',
    correoElectronico: '',
  });

  const handleChange = createHandleChange(setFormApoderado);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apoderado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formApoderado),
    });
    if (res.ok) {
      alert('Apoderado registrado');
    } else {
      alert('Error al registrar apoderado');
    }
  };

  return { formApoderado, handleChange, handleSubmit };
}