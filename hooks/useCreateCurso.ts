'use client';

import { useState } from 'react';
import type { curso } from '@/types/types';

export function useCreateCurso() {
    const handleCreate = async (newCurso: Omit<curso, 'idCurso'>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCurso),
            });

            if (res.ok) {
                const createdCurso = await res.json();
                return createdCurso;
            } else {
                alert("Error al crear el curso");
                return null;
            }
        } catch (error) {
            console.error('Error al crear curso:', error);
            return null;
        }
    };

    return {
        handleCreate,
    };
}
