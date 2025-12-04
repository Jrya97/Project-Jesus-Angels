'use client';

import { useState, useEffect } from 'react';
import type { curso } from '@/types/types';

export function useEditCurso(initialCurso: curso | undefined) {
    const [cursoData, setCursoData] = useState<curso | undefined>(initialCurso);
    useEffect(() => {
        setCursoData(initialCurso);
    }, [initialCurso]);

    const updateCurso = (updatedCurso: curso) => {
        setCursoData(updatedCurso);
    };

    const handleSave = async (cursoToUpdate: curso) => {
        try {
            const id = cursoToUpdate.idCurso;
            if (!id) {
                console.error('Error: No se encontró el ID del curso para actualizar');
                return false;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoToUpdate),
            });

            if (res.ok) {
                updateCurso(cursoToUpdate);
                return true;
            } else {
                alert("Error al actualizar el curso");
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar curso:', error);
            return false;
        }
    };

    return {
        cursoData,
        updateCurso,
        handleSave,
    };
}
