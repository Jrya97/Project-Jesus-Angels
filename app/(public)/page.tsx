import { BanerMatricula } from "../components/view/banerMatricula";
import { ImagenesCarrusel } from "../components/ui/imagenesCarrusel";
import { BannerCarrusel } from "../../data/banerCarrusel";

export default function Home() {
  return (
    <main className="relative font-sans">
      <video src="/Fondo.mp4" autoPlay loop muted className="absolute inset-0 w-full h-full object-cover"></video>
      <div className="z-21 w-full py-15">
        <BanerMatricula />
        <ImagenesCarrusel imagenesCarrusel={BannerCarrusel}/>
      </div>
     </main>
  );
}
