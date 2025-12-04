'use client';

import { useState, useEffect } from 'react';
import type { Matricula } from '@/types/types';

export function useEditMatricula(initialMatricula: Matricula | undefined) {
    const [matriculaData, setMatriculaData] = useState<Matricula | undefined>(initialMatricula);
    useEffect(() => {
        setMatriculaData(initialMatricula);
    }, [initialMatricula]);

    const updateMatricula = (updatedMatricula: Matricula) => {
        setMatriculaData(updatedMatricula);
    };

    const handleSave = async (matriculaToUpdate: Matricula) => {
        try {
            const id = matriculaToUpdate.idMatricula;
            if (!id) {
                console.error('Error: No se encontró el ID de la matrícula para actualizar');
                return false;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matriculaToUpdate),
            });

            if (res.ok) {
                updateMatricula(matriculaToUpdate);
                return true;
            } else {
                alert("Error al actualizar la matrícula");
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar matrícula:', error);
            return false;
        }
    };

    return {
        matriculaData,
        updateMatricula,
        handleSave,
    };
}
