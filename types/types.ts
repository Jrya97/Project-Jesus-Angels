export type CardsProps = {
  title: string;
  description: string;
  image: string;
};

export type Apoderado = {
  id_apoderado?: string;
  nombre: string;
  dni: string;
  telefono: string;
  correo_electronico: string;
};

export type Alumno = {
  id_alumno?: string;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  direccion: string;
  id_apoderado: string;
};

export type Usuario = {
  id_usuario?: string;
  nombre: string;
  correo_electronico: string;
  password: string;
  rol: string;
};

type Estado = 'ACTIVO'|'RETIRADO'|'ANULADO'
export type Matricula = {
  id_matricula?:string;
  id_alumno: string;
  id_grado: string;
  anio_lectivo: string;
  fecha_matricula:string;
  estado: Estado
}

export type Grado = {
  id_grado?:string;
  nombre: string;
  nivel: string;
}

