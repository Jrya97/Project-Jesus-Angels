'use client';

import { useEffect, useState } from "react";
import { getMatriculaByIdAlumnos } from "@/utils/getFetch";
import { Matricula } from "@/types/types";


export function useMatriculaById(id: number | string) {

    const [dataMatricula, setDataMatricula] = useState<Matricula | null>(null);

    useEffect(() => {
        const dataPerfiles = async () => {
            const matricula = await getMatriculaByIdAlumnos(id);
            setDataMatricula(matricula || []);
        }

        dataPerfiles();
    }, [id]);

    return {
        dataMatricula,
    }
}