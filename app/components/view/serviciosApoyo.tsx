import  {dataCardsServiciosApoyo} from "../../../data/dataCards"

import { Cards } from "../ui/cards";
import { ColeccionCards } from "./coleccionCards";

export function ServiciosDeApoyo() {
  return (
    <ColeccionCards tituloGeneral="Servicios de Apoyo">
      {dataCardsServiciosApoyo.map((card, index) => (
        <Cards 
        key={index}
        title={card.title}
        description={card.description}
        image={card.image}
        />
        ))}
    </ColeccionCards>
    )
}