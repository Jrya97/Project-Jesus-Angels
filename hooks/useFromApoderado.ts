'use client';
import { useState } from 'react';
import { Apoderado } from '@/types/types';

export function useFormApoderado(onSuccess: () => void) {
  const [formApoderado, setFormApoderado] = useState<Apoderado>({
    nombre: '',
    dni: '',
    telefono: '',
    correo_electronico: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormApoderado(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/apoderado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formApoderado),
    });
    if (!res.ok) {
      alert('Apoderado registrado');
      onSuccess();
    } else {
      alert('Error al registrar apoderado');
    }
  };

  return { formApoderado, handleChange, handleSubmit };
}