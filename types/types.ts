import { UUID } from "crypto";

export type CardsProps = {
  title: string;
  description: string;
  image: string;
};

export type Apoderado = {
  idApoderado?: number;
  nombre: string;
  dni: string;
  telefono: string;
  correoElectronico: string;
  creadoEn?: string;
};

export type Alumno = {
  idAlumno?: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  direccion: string;
  idApoderado: number;
  creadoEn?: string;
};

export type Usuario = {
  id_usuario?: UUID;
  nombre: string;
  correo_electronico: string;
  password: string;
  rol: string;
};

type Estado = 'ACTIVO' | 'RETIRADO' | 'ANULADO'
export type Matricula = {
  idMatricula?: number;
  idAlumno: number;
  idGrado: number;
  anio_lectivo: string;
  fecha_matricula: string;
  estado: Estado
}

export type Grado = {
  idGrado?: number;
  nombre: string;
  nivel: string;
}

