import {dataCardsHerramientas} from "../../data/dataCards"

import { Cards } from "../ui/cards"
import { ColeccionCards } from "./coleccionCards"

export function HerramientasAcademicas() {
    return ( 
        <ColeccionCards tituloGeneral="Herramientas Académicas">
          {dataCardsHerramientas.map((card, index) => (
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