import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"
import Modal from "./Modal"
import VerificationCard from './VerificationCard'

export default function PokeCard({selectedPokemon}){

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [skill,setSkill] = useState(null)
    const [showCard,setShowCard] = useState(true)

    const {sprites} = data || {}

    const imgList = Object.keys(sprites || {}).filter(val=>{
        if(!sprites[val]) return false
        if(['versions','other'].includes(val)) return false
        return true
    })

    useEffect(()=>{
        if(loading || !localStorage) return

        let cache = {}

        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if(selectedPokemon in cache){
            setData(cache[selectedPokemon])
            return;
        }

        async function fetchPokemonData() {
            setLoading(true)
            try{
                const baseURL = 'https://pokeapi.co/api/v2/';
                const suffix = 'pokemon/'+ getPokedexNumber(selectedPokemon);
                const finalURL = baseURL+suffix;
                const response = await fetch(finalURL)
                const pokemonData = await response.json();
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex',JSON.stringify(cache))
            }
            catch(error){
                console.log(error.message)
            }
            finally{
                setLoading(false)
            }            
        }

        fetchPokemonData()
    },[selectedPokemon])

    if(loading || !data){
        return(
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    const handleCloseModal = () =>{
        // setSkill(null)
        setShowCard(false)
    }

    return(
        <div className="poke-card">
            {showCard && <Modal handleCloseModal={handleCloseModal}>
                <VerificationCard data={skill} />
            </Modal>}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{data.name}</h2>
            </div>
            <div className="type-container">
                {data.types.map((type,typeIndex)=>{
                    return(
                        <TypeCard key={typeIndex} _type={type} />
                    )
                })}
            </div>
            <img className="default-img" alt={`${data.name}-large-image`} src={'/pokemon/'+getFullPokedexNumber(selectedPokemon)+'.png'}></img>
            <div className="img-container">
                {imgList.map((spriteUrl,spriteIndex)=>{
                    const imageUrl = sprites[spriteUrl]
                    return(
                        <img key={spriteIndex} src={imageUrl} alt={`${data.name}-img-${spriteUrl}`}></img>
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {data?.stats.map((statObject,statIndex)=>{
                    const {stat,base_stat} = statObject
                    return (
                        <div className="stat-item" key={statIndex}>
                            <p>{stat?.name.replaceAll('-',' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {data.moves.map((moveObject,moveIndex)=>{
                    return(
                        <button className="button-card pokemon-move" key={moveIndex} onClick={()=>{ setSkill({
                            trustScore: 92
                        })}}>
                            <p>{moveObject?.move?.name.replaceAll('-',' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}