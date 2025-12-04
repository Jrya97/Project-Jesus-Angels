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
  apoderado: {
    idApoderado: number;
  };
  creadoEn?: string;
};

export type Perfil = {
  id?: UUID;
  nombre: string;
  correoElectronico?: string;
  rol: string;
}

export type Usuario = {
  id?: UUID;
  email: string;
  password: string;
};

type Estado = 'ACTIVO' | 'RETIRADO' | 'ANULADO'
export type Matricula = {
  idMatricula?: number;
  alumno: { idAlumno: number };
  grado: { idGrado: number };
  anioLectivo: string;
  fechaMatricula: string;
  estado: Estado
}

export type Grado = {
  idGrado?: number;
  nombre: string;
  nivel: string;
}

