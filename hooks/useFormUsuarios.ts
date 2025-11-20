'use client';

import { useState } from 'react';
import { Usuario } from '@/types/types';
import {createHandleChange} from '@/utils/formHelpers';

export function useFormUsuario() {
  const [formUsuario, setFormUsuario] = useState<Usuario>({
    nombre: '',
    password: '',
    correo_electronico: '',
    rol: '',
  });

  const handleChange = createHandleChange(setFormUsuario);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/Usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formUsuario),
    });
    if (!res.ok) {
      alert('Apoderado registrado');
    } else {
      alert('Error al registrar apoderado');
    }
  };

  return { formUsuario, handleChange, handleSubmit };
}