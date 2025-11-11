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
  },
  openGraph: {
    title: "Colegio Jesus Angeles",
    description:
      "Somos un Colegio que ofrece una educación integral basada en el amor, los valores y la excelencia académica.",
    url: "https://project-jesus-angels-snd3.vercel.app/",
    siteName: "Colegio Jesus Angeles",
    images: [
      {
        url: "/Logo-Jesus-Angels.png",
        width: 1200,
        height: 630,
        alt: "Colegio Jesus Angeles",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Colegio Jesus Angeles",
    description:
      "Somos un Colegio que ofrece una educación integral basada en el amor, los valores y la excelencia académica.",
    images: ["/Logo-Jesus-Angels.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
