'use client';

import { useState } from 'react';
import { Usuario } from '@/types/types';
<<<<<<< HEAD
import {createHandleChange} from '@/utils/formHelpers';
=======
import { createHandleChange } from '@/utils/formHelpers';
>>>>>>> dev

export function useFormUsuario() {
  const [formUsuario, setFormUsuario] = useState<Usuario>({
    email: '',
    password: '',
  });

  const handleChange = createHandleChange(setFormUsuario);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formUsuario),
    });
    if (res.ok) {
      alert('Perfil registrado');
    } else {
      alert('Error al registrar perfil');
    }
  };

  return { formUsuario, handleChange, handleSubmit };
}