
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getAlumnos() {
    try {
        const res = await fetch(`${API_URL}/alumnos`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataAlumnos = await res.json();
        return dataAlumnos;
    } catch (error) {
        console.error('Error fetching alumnos:', error);
        return null;
    }
}

export async function getApoderados() {
    try {
        const res = await fetch(`${API_URL}/apoderados`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataApoderados = await res.json();
        return dataApoderados;
    } catch (error) {
        console.error('Error fetching apoderados:', error);
        return null;
    }
}

export async function getGrados() {
    try {
        const res = await fetch(`${API_URL}/grados`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataGrados = await res.json();
        return dataGrados;
    } catch (error) {
        console.error('Error fetching grados:', error);
        return null;
    }
}

export async function getAsistencia() {
    try {
        const res = await fetch(`${API_URL}/asistencia`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataAsistencia = await res.json();
        return dataAsistencia;
    } catch (error) {
        console.error('Error fetching asistencia:', error);
        return null;
    }
}

export async function getCursos() {
    try {
        const res = await fetch(`${API_URL}/cursos`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataCursos = await res.json();
        return dataCursos;
    } catch (error) {
        console.error('Error fetching cursos:', error);
        return null;
    }
}

export async function getMatriculas() {
    try {
        const res = await fetch(`${API_URL}/matriculas`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataMatriculas = await res.json();
        return dataMatriculas;
    } catch (error) {
        console.error('Error fetching matriculas:', error);
        return null;
    }
}

export async function getNotas() {
    try {
        const res = await fetch(`${API_URL}/notas`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataNotas = await res.json();
        return dataNotas;
    } catch (error) {
        console.error('Error fetching notas:', error);
        return null;
    }
}

export async function getPagos() {
    try {
        const res = await fetch(`${API_URL}/pagos`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataPagos = await res.json();
        return dataPagos;
    } catch (error) {
        console.error('Error fetching pagos:', error);
        return null;
    }
}

export async function getPerfiles() {
    try {
        const res = await fetch(`${API_URL}/perfiles`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataPerfiles = await res.json();
        return dataPerfiles;
    } catch (error) {
        console.error('Error fetching perfiles:', error);
        return null;
    }
}

// ==================== FUNCIONES PARA OBTENER POR ID ====================

export async function getAlumnoById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/alumnos/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataAlumno = await res.json();
        return dataAlumno;
    } catch (error) {
        console.error(`Error fetching alumno ${id}:`, error);
        return null;
    }
}

export async function getApoderadoById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/apoderados/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataApoderado = await res.json();
        return dataApoderado;
    } catch (error) {
        console.error(`Error fetching apoderado ${id}:`, error);
        return null;
    }
}

export async function getGradoById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/grados/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataGrado = await res.json();
        return dataGrado;
    } catch (error) {
        console.error(`Error fetching grado ${id}:`, error);
        return null;
    }
}

export async function getAsistenciaById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/asistencia/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataAsistencia = await res.json();
        return dataAsistencia;
    } catch (error) {
        console.error(`Error fetching asistencia ${id}:`, error);
        return null;
    }
}

export async function getCursoById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/cursos/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataCurso = await res.json();
        return dataCurso;
    } catch (error) {
        console.error(`Error fetching curso ${id}:`, error);
        return null;
    }
}

export async function getMatriculaById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/matriculas/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataMatricula = await res.json();
        return dataMatricula;
    } catch (error) {
        console.error(`Error fetching matricula ${id}:`, error);
        return null;
    }
}

export async function getMatriculaByIdAlumnos(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/matriculas/alumno/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataMatricula = await res.json();
        return dataMatricula;
    } catch (error) {
        console.error(`Error fetching matricula ${id}:`, error);
        return null;
    }
}

export async function getNotaById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/notas/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataNota = await res.json();
        return dataNota;
    } catch (error) {
        console.error(`Error fetching nota ${id}:`, error);
        return null;
    }
}

export async function getPagoById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/pagos/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataPago = await res.json();
        return dataPago;
    } catch (error) {
        console.error(`Error fetching pago ${id}:`, error);
        return null;
    }
}

export async function getPagoByIdAlumno(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/pagos/alumno/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataPago = await res.json();
        return dataPago;
    } catch (error) {
        console.error(`Error fetching pago ${id}:`, error);
        return null;
    }
}


export async function getPerfilById(id: string | number) {
    try {
        const res = await fetch(`${API_URL}/perfiles/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const dataPerfil = await res.json();
        return dataPerfil;
    } catch (error) {
        console.error(`Error fetching perfil ${id}:`, error);
        return null;
    }
}

