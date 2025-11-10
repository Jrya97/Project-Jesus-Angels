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

export default function AdminLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="es">
      <body className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}