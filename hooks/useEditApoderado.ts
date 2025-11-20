'use client';

import { useState } from 'react';
import type { Apoderado } from '@/types/types';

export function useEditApoderado(initialApoderado: Apoderado | undefined) {
  const [apoderadoData, setApoderadoData] = useState(initialApoderado);

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
