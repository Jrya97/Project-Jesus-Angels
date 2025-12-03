'use client';

<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> dev
import type { Apoderado } from '@/types/types';

export function useEditApoderado(initialApoderado: Apoderado | undefined) {
  const [apoderadoData, setApoderadoData] = useState(initialApoderado);

<<<<<<< HEAD
  const updateApoderado = (updatedApoderado: Apoderado) => {
    setApoderadoData(updatedApoderado);
    // Aquí agregar una llamada a la API para guardar los cambios
    console.log("Apoderado actualizado:", updatedApoderado);
  };

  const handleSave = async (updatedApoderado: Apoderado) => {
    try {
      // const res = await fetch(`/api/apoderado/${updatedApoderado.id_apoderado}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedApoderado),
      // });
      // if (res.ok) {
      //   updateApoderado(updatedApoderado);
      //   return true;
      // }
      // return false;
      
      updateApoderado(updatedApoderado);
      return true;
=======
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
>>>>>>> dev
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
