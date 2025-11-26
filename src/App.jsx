import './App.css'
import Header from './components/Header'
import SideNav from './components/SideNav'
import PokeCard from './components/PokeCard'
import { useState } from 'react'

function App() {

  const [selectedPokemon,setSelectedPokemon] = useState(0);
  const triggerNewPokedex = (pokedex)=>{
    setSelectedPokemon(+pokedex-1)
  }
  return (
    <>
      <Header />
      <SideNav selectedPokemon={selectedPokemon} triggerNewPokedex={triggerNewPokedex} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App
