import React from 'react';
import './Catch.css';

import { SearchPokemon } from '../../SearchPokemon/SearchPokemon';
import { PokemonCard } from '../../PokemonCard/PokemonCard';
import { GameContext } from '../../GameContext/GameContext'


function Catch() {

    
    const {
        loadingPokemonList, 
        errorPokemonList,
        cardPokemon,
        // loadingPokemon,
        // errorPokemon,
        existPokemon,
        removePokemon,
        addPokemon } = React.useContext(GameContext);


    return (
        <div className="app--container">
            {loadingPokemonList && <p>Loading</p>}
            {errorPokemonList && <p>Error, please re-load the page or try later</p>}
            { !loadingPokemonList && 
            <>
                <header>
                    <div className="header-title"></div>
                    <SearchPokemon />
                </header>
                <main>
                    <h2>Want to catch it?</h2>
                    <div className="main-saved-pokemons--container">
                        <h3>All catched pokemons go to <span>My Pokes</span></h3>
                    </div>
                    {!existPokemon && <p className="main-save-pokemons--existPokemon">This Pokemon Doesn't Exist <br /> Try Again</p>}
                    <PokemonCard
                        cardPokemon={cardPokemon}
                        removePokemon={removePokemon}
                        addPokemon={addPokemon}
                        needCatch={true}/>

                </main>
            </>
            }
        </div>
    )
}

export default Catch


