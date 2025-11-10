import { Formulario } from "../../components/view/formulario";

export default function ContactosPage() {
  return (
    <main  id="contactos" className="relative p-10 w-full font-sans flex flex-col items-center gap-10">
      <video src="/Fondo.mp4" autoPlay loop muted className="absolute -z-10 inset-0 w-full h-full object-cover"/>
      <h2
        className="text-3xl sm:text-4xl md:text-6xl
            font-extrabold text-center
            text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]"
      >
        Contáctanos
      </h2>
      <div
        className="flex flex-col lg:flex-row items-center justify-center
                   gap-10 lg:gap-20 w-full max-w-7xl"
      >
        <aside
          className="flex flex-col gap-6 justify-center items-center text-center 
                     text-lg sm:text-xl md:text-2xl max-w-md text-gray-600"
        >
          <h3
            className="text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)] font-semibold text-2xl sm:text-3xl md:text-4xl"
          >
            Información del colegio
          </h3>
          <address className="not-italic">
            <p>Colegio Jesús Angels</p>
            <p>Jr. Diego Cisneros Nº 382 - Urb Santa Luzmila - Comas, Lima, Perú</p>
            <p>
              Teléfono:{" "}
              <a
                href="tel:+51987197782"
                className="text-[#24a9e7] hover:underline"
              >
                987 197 782
              </a>
            </p>
            <p>
              Correo:{" "}
              <a
                href="mailto:contacto@jesusangels.edu.pe"
                className="text-[#24a9e7] hover:underline"
              >
                jesusangels.edu@gmail.com
              </a>
            </p>
          </address>
          <p>Horario: Lunes a Viernes de 8:00 a 17:00</p>
        </aside>
        <Formulario />
      </div>
    </main>
  );
}