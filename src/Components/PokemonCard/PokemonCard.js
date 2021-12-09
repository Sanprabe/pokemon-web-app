import React from 'react'
import './PokemonCard.css'

import { GameContext } from '../GameContext/GameContext';


function PokemonCard({cardPokemon, removePokemon, needCatch, index}) {

    // console.log(loadingPokemon);

    const { addPokemon } = React.useContext(GameContext);

    const uknownPokemon = '??';
    
    let pokemonImage = (cardPokemon? cardPokemon.sprites.front_default : "https://www.chasekellywtpgame.com/images/question.png" )

    return (
        <div className="card--container">
            <button className="card-close--container" onClick={() => removePokemon(index)}></button>
            <h3 className="card--title">{cardPokemon? cardPokemon.name : uknownPokemon.repeat(3)}</h3>
            <div className="card-image--container">
                <img src={pokemonImage} alt="Pokemon front"/>
            </div>
            
            <div className="card-stats--main_container">
                <h3 className="card-stats--title">Stats</h3>
                <p className="card-stats--type">Type: {cardPokemon? cardPokemon.types[0].type.name : uknownPokemon.repeat(2)}</p>
                <div className="card-stats--container">
                    <div className="card-stat">
                        <h6>HP: <span>{cardPokemon? cardPokemon.stats[0].base_stat : uknownPokemon}</span></h6>
                    </div>
                    <div className="card-stat">
                        <h6>Attack: <span>{cardPokemon? cardPokemon.stats[1].base_stat : uknownPokemon}</span></h6>
                    </div>
                    <div className="card-stat">
                        <h6>Defense: <span>{cardPokemon? cardPokemon.stats[2].base_stat : uknownPokemon}</span></h6>
                    </div>
                    <div className="card-stat">
                        <h6>Sp.Attack: <span>{cardPokemon? cardPokemon.stats[3].base_stat : uknownPokemon}</span></h6>
                    </div>
                    <div className="card-stat">
                        <h6>Sp.Defense: <span>{cardPokemon? cardPokemon.stats[4].base_stat : uknownPokemon}</span></h6>
                    </div>
                    <div className="card-stat">
                        <h6>Speed: <span>{cardPokemon? cardPokemon.stats[5].base_stat : uknownPokemon}</span></h6>
                    </div>
                </div>
            </div>
            { (cardPokemon && needCatch)  && <div className="card-save--container">
                                <button onClick={addPokemon}>Catch me!</button>
                             </div>
            }
        </div>
    )
}

export { PokemonCard }