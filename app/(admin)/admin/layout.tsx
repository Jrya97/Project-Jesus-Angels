import type { Metadata } from "next";
import Sidebar from "../../components/view/sideBar";
import "../../ui/globals.css";

export const metadata: Metadata = {
  title: "Area Admin",
  description: `Area administrativa del Colegio Jesus Angels`,
  icons: {
    icon: "/Logo.svg",
  }
};

export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className="flex bg-gray-100 h-screen overflow-hidden m-0 p-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/Fondo-Admin.mp4" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-full h-full bg-white/50 -z-10"></div>

        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}