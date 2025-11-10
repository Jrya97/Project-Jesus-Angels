import type { Metadata } from "next";
import "../ui/globals.css";
import { HeaderLayout } from "../components/layout/headerLayout";
import { FooterLayout } from "../components/layout/footerLayout";


export const metadata: Metadata = {
  title: "Colegio Jesus Angeles",
  description: `"Somos un Colegio que ofrece una educación integral basada en el amor,
   los valores y la excelencia académica. Formamos a niños y niñas de Inicial y Primaria en un ambiente seguro y alegre, 
   promoviendo su desarrollo intelectual, emocional y espiritual. Con un equipo docente comprometido y metodologías activas, 
   cultivamos la curiosidad, la creatividad y los valores que hacen de nuestros estudiantes niños felices, seguros y con 
   una sólida formación."`,
   icons: {
    icon: "/Logo.svg",
  }
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <HeaderLayout />
        {children}
        <FooterLayout />
      </body>
    </html>
  );
}
