import { pokemonTypeColors } from "../utils"

export default function TypeCard({_type}){
    const {type} = _type
    return(
        <div className="type-tile" style={{color:pokemonTypeColors?.[type?.name]?.color,background:pokemonTypeColors?.[type?.name]?.background}}>
            <p>{type?.name}</p>
        </div>
    )
}