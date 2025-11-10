import {dataCardsActividadesEscolares} from "../../data/dataCards"

import { Cards } from "../ui/cards"
import { ColeccionCards } from "./coleccionCards"

export function VidaEscolar (){
    return (
        <ColeccionCards tituloGeneral="Actividades y Vida Escolar">
          {dataCardsActividadesEscolares.map((card, index) => (
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