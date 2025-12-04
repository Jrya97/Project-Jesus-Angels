'use client';


import { useState, useEffect } from 'react';
import type { Apoderado } from '@/types/types';

export function useEditApoderado(initialApoderado: Apoderado | undefined) {
  const [apoderadoData, setApoderadoData] = useState(initialApoderado);

  useEffect(() => {
    setApoderadoData(initialApoderado);
  }, [initialApoderado]);

  const updateApoderado = (updatedApoderado: Apoderado) => {
    setApoderadoData(updatedApoderado);
  };



  const handleSave = async (updatedApoderado: Apoderado) => {
    try {
      const id = updatedApoderado.idApoderado
      if (!id) {
        console.error('Error: No se encontró el ID del Apoderado para actualizar');
        return false;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apoderados/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedApoderado),
      });

      if (res.ok) {
        updateApoderado(updatedApoderado);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar apoderado:', error);
      return false;
    }
  };

  return {
    apoderadoData,
    updateApoderado,
    handleSave,
  };
}
