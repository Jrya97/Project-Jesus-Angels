# Sistema de Gestión Académica - I.E. "Jesús Angels"

Este proyecto es una plataforma web integral desarrollada con **Next.js** y **TypeScript**, diseñada para la administración y gestión académica de la institución educativa "Jesús Angels". Permite la interacción eficiente entre administradores, profesores y alumnos.

## 🚀 Características Principales

### 🎓 Módulo Administrativo
Panel de control completo para la gestión institucional:
- **Gestión de Alumnos y Matrículas:** Registro, edición y seguimiento de expedientes estudiantiles.
- **Control Académico:** Administración de grados, cursos y asignación de profesores.
- **Notas y Asistencia:** Supervisión global de calificaciones y registros de asistencia.
- **Pagos:** Control de pensiones y pagos de matrícula.

### 👨‍🏫 Módulo de Profesores
Herramientas específicas para la labor docente:
- **Registro de Asistencia:** Toma de asistencia diaria por grados y secciones.
- **Gestión de Calificaciones:** Ingreso y edición de notas por alumno y curso.
- **Historial:** Visualización y corrección de registros de asistencia pasados.

### 🔍 Módulo Público y de Alumnos
Acceso facilitado a la información académica:
- **Consulta de Notas:** Portal público donde los alumnos pueden verificar sus calificaciones ingresando su DNI y código de seguridad (primeras letras del nombre).
- **Inicio de Sesión:** Acceso seguro para personal administrativo y docente.

## 🛠️ Tecnologías Utilizadas

- **Core:** [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconos:** React Icons

## 💻 Instalación y Puesta en Marcha

Para ejecutar el proyecto localmente, sigue estos pasos:

1.  **Instalar dependencias:**

    ```bash
    npm install
    # o
    pnpm install
    ```

2.  **Configurar Variables de Entorno:**
    Asegúrate de tener configurado el archivo `.env.local` con la URL de tu API backend:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    ```

3.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    # o
    pnpm dev
    ```

4.  **Acceder a la aplicación:**
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

- `/app`: Rutas y páginas de la aplicación (App Router).
  - `(admin)`: Rutas protegidas para administradores.
  - `(profesor)`: Rutas protegidas para docentes.
  - `(public)`: Rutas de acceso público (Login, Consulta de Notas).
- `/components`: Componentes reutilizables de UI (formularios, tablas, modales).
- `/hooks`: Lógica de estado y efectos personalizados (ej. `useAsistencia`, `useLogin`).
- `/utils`: Funciones de utilidad y llamadas a la API (`getFetch.ts`).
- `/types`: Definiciones de tipos TypeScript (`types.ts`).
