'use client';

import { useState, useEffect } from 'react';
import type { Pago } from '@/types/types';

export function useEditPago(initialPago: Pago | undefined) {
    const [pagoData, setPagoData] = useState<Pago | undefined>(initialPago);
    useEffect(() => {
        setPagoData(initialPago);
    }, [initialPago]);

    const updatePago = (updatedPago: Pago) => {
        setPagoData(updatedPago);

    };

    const handleSave = async (pagoToUpdate: Pago) => {
        try {
            const id = pagoToUpdate.idPago;
            if (!id) {
                console.error('Error: No se encontró el ID del pago para actualizar');
                return false;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pagos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pagoToUpdate),
            });

            if (res.ok) {
                updatePago(pagoToUpdate);
                return true;
            } else {
                alert("Error al actualizar el pago");
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar pago:', error);
            return false;
        }
    };

    return {
        pagoData,
        updatePago,
        handleSave,
    };
}
