'use client';

import { useEffect, useState } from "react";
import { getPerfiles } from "@/utils/getFetch";
import { Perfil } from "@/types/types";


export function usePerfiles() {

    const [dataPerfiles, setDataPerfiles] = useState<Perfil[]>([]);

    useEffect(() => {
        const dataPerfiles = async () => {
            const perfiles = await getPerfiles();
            setDataPerfiles(perfiles || []);
        }

        dataPerfiles();
    }, []);

    return {
        dataPerfiles,
    }
}
