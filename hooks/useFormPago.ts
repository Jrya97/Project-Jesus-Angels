'use client';
import { useState } from 'react';
import { Pago } from '@/types/types';
import { createHandleChangeAlumno } from '@/utils/formHelpersAlumno';

export function useFormPago() {
    const [formPago, setFormPago] = useState<Pago>({
        alumno: {
            idAlumno: 0,
        },
        tipo: "MENSUALIDAD",
        mes: null,
        monto: 200,
        fechaPago: new Date().toISOString().split("T")[0],
        estado: 'PAGADO',
        anioPago: new Date().getFullYear().toString(),
    });

    const handleChange = createHandleChangeAlumno(setFormPago);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pagos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formPago),
        });
        if (res.ok) {
            alert('Pago registrado');
        } else {
            alert('Error al registrar pago');
        }
    };

    return { formPago, handleChange, handleSubmit };
}