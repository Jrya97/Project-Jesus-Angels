
import { MensajeError } from '../ui/mensajeError';
import FondoAdmin from './fondoAdmin';

interface FallaAlumnoProps {
    id: string;
}

export default function FallaAlumno({ id }: FallaAlumnoProps) {
    return (
        <FondoAdmin>
            <MensajeError
                titulo="Alumno no encontrado"
                mensaje={`No se encontró el alumno con ID: ${id}`}
            />
        </FondoAdmin>
    );
}
