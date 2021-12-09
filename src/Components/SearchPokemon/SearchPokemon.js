import React from 'react';
import './SearchPokemon.css';

import { GameContext } from '../GameContext/GameContext';

function SearchPokemon () {

    const { randomPokemon, userPokemon } = React.useContext(GameContext);

    // const [searchBarValue, searchBarValue] = React.useState('')

    return (
        <div className="search-pokemon--container">
            <input type="text" placeholder="Pikachu..." id="searchBar-specific-pokemon"></input>
            <div className="search-pokemon-buttons--container">
                <button className="search-pokemon-buttons--left" onClick={userPokemon}>Search</button>
                <button className="search-pokemon-buttons--right" onClick={randomPokemon}>Random</button>
            </div>
        </div>
    );
}

export { SearchPokemon };
