import { MisionVision } from "../../components/view/mision-vision";

export default function NosotrosPage() {
  return (
    <main id="nosotros" className="relative w-full pt-10 font-sans animate-fade-in">
      <video src="/Fondo.mp4" autoPlay loop muted className="absolute -z-10 inset-0 w-full h-full object-cover" />
      <section>
        <article
          className="
          flex flex-col
          justify-center items-center
          py-10 px-5 md:px-10 lg:px-25
          gap-10"
        >
          <h2
            className="
            text-3xl sm:text-4xl md:text-6xl
            font-extrabold text-center md:text-left
            text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]
            animate-zoom-in"
          >
            ¿Quiénes Somos?
          </h2>

          <p className="text-justify text-lg sm:text-xl md:text-2xl max-w-[1250px] text-gray-700 animate-fade-up">
            Somos un Colegio que ofrece una educación integral basada en el amor, los valores y la excelencia
            académica. <span className="bg-linear-to-r from-green-500 to-[#24a9e7]
          text-transparent bg-clip-text font-bold">Formamos a niños y niñas de Inicial y Primaria en un ambiente seguro y alegre, promoviendo
              su desarrollo intelectual, emocional y espiritual</span>. Con un equipo docente comprometido y metodologías
            activas, cultivamos la curiosidad, la creatividad y los valores que hacen de nuestros estudiantes niños
            felices, seguros y con una sólida formación.
          </p>
        </article>
        <MisionVision
          className="mt-10"
          imagen={"/Mision.jpg"}
          titulo="Nuestra Misión">
          Brindar una <span className="bg-linear-to-r from-green-500 to-[#24a9e7]
          text-transparent bg-clip-text font-bold">educación integral y de calidad</span>, basada en el amor, los valores y
          la excelencia académica, que forme niños y niñas con pensamiento crítico, espíritu solidario
          y compromiso con su entorno. <span className="bg-linear-to-r from-green-500 to-[#24a9e7]
          text-transparent bg-clip-text font-bold">Nuestro propósito es acompañar su desarrollo intelectual, emocional
            y espiritual</span>, para que crezcan como personas felices, seguras y con una sólida formación en valores.
        </MisionVision>

        <MisionVision
          className="mt-10 md:flex-row-reverse"
          imagen={"/Vision.jpg"}
          titulo="Nuestra Visión">
          Ser una <span className="bg-linear-to-r from-green-500 to-[#24a9e7] text-transparent bg-clip-text font-bold">
            institución educativa líder</span>, reconocida por su calidad humana y académica, que inspire a los estudiantes a transformar
          su comunidad con fe, responsabilidad y amor. Aspiramos a formar <span className="bg-linear-to-r from-green-500 to-[#24a9e7] 
          text-transparent bg-clip-text font-bold">generaciones comprometidas con el bien común</span>, capaces de afrontar
          los desafíos del futuro con creatividad, confianza y valores firmes.
        </MisionVision>

        <MisionVision
          className="mt-10"
          imagen={"/Valores.jpg"}
          titulo="Nuestros Valores">
          Fomentamos valores como <span className="bg-linear-to-r from-green-500 to-[#24a9e7] text-transparent bg-clip-text font-bold">
            el respeto, la responsabilidad y la solidaridad</span>, que son fundamentales en la formación integral de nuestros estudiantes.
          Creemos que una educación de calidad debe ir acompañada de una sólida formación en valores, que les permita desenvolverse con ética y
          compromiso en la sociedad.
        </MisionVision>
      </section>

    </main>
  );
}