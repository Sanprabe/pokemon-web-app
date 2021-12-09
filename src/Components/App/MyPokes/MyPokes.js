import React from 'react'
import './MyPokes.css'

import { PokemonCard } from '../../PokemonCard/PokemonCard'
import { GameContext } from '../../GameContext/GameContext'

function MyPokes() {

    const { 
        myPokes,
        unsavePoke
         } = React.useContext(GameContext);
    

    let index = -1;

    return (
        <div className="my-pokes--container">
            <header>
                <div className="my-pokes--title"></div>
                <h2>ALL YOUR POKEMONS ARE HERE</h2>
            </header>
            <main className="my-pokes--main">
                {
                    myPokes.map(poke =>{
                        index = index + 1
                        console.log(index)
                        return <PokemonCard
                                    cardPokemon={poke} 
                                    removePokemon={unsavePoke}
                                    needCatch={false}
                                    index={index}
                                    key={poke.id}
                                    />
                    })
                }
            </main>
        </div>
    )
}

export default MyPokes

