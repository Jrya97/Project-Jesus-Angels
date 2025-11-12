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