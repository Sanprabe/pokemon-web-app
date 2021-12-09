import React from "react";

import { useFetch } from "./DataFetch";

const GameContext = React.createContext();

// Has all the logic of the game in a context so it can be used in all child components
function GameProvider(props){


    const [cardPokemon, setCardPokemon] = React.useState()

    const [existPokemon, setExistPokemon] = React.useState(true);

    const [myPokes, setMyPokes] = React.useState([]);
    
    
    // Get all pokemons and save their names in a list
    
    
    const {
        
        error: errorPokemonList,
        loading: loadingPokemonList,
        item: pokemonList
        
    } = useFetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000');
    
    let pokemonListNames;
    
    if(pokemonList){
        pokemonListNames = pokemonList.results.map(poke => poke.name)
    }
    
    // Get pokemon given by user
    
    const [urlPokemon, setUrlPokemon] = React.useState()
    
    const {
        
        error: errorPokemon,
        loading: loadingPokemon,
        item: pokemon
        
    } = useFetch(urlPokemon);

    
    const firstUpdate = React.useRef(true);
    
    React.useEffect(() => {
        
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }
        
        setCardPokemon(pokemon)
    }, [urlPokemon, pokemon])




    // // Verifies if the pokemon the user gave us exist

    const userPokemon = () => {

        setExistPokemon(true)

        const namePokemonUser = document.getElementById('searchBar-specific-pokemon').value

        const pokemonUser = pokemonList.results.filter( obj => (obj.name === namePokemonUser.toLowerCase()))

        let urlPokemon;

        if (pokemonUser.length === 0){
            setExistPokemon(false)
            setCardPokemon(undefined)
            console.log('no existe')
        }else{
            urlPokemon = pokemonUser[0].url
            setUrlPokemon(urlPokemon)
            document.getElementById('searchBar-specific-pokemon').value = ''
            console.log('existe')
        }
    }

    // Search random pokemon for user

    const randomPokemon = () => {

        setExistPokemon(true)

        const randomId = Math.floor(Math.random() * 1119)
        
        const randomUrlPokemon = pokemonList.results[randomId].url

        setUrlPokemon(randomUrlPokemon)

        document.getElementById('searchBar-specific-pokemon').value = ''
    }

    // Remove Pokemon Button

    const removePokemon = () => {
        setCardPokemon(undefined)
    }

    const addPokemon = () => {
        setMyPokes(prev => [...prev, cardPokemon]);
        setCardPokemon(undefined); // No se puede buscar dos veces seguidas el mismo pokemon
    }

    const unsavePoke = (index) => {
        let newMyPokes = [...myPokes];
        newMyPokes.splice(index, 1);
        setMyPokes(newMyPokes);
    }

    return(
        // Returns all variables that need to be used by child components
        <GameContext.Provider
            value={
                {   
                    errorPokemonList,
                    loadingPokemonList,
                    pokemonListNames,
                    userPokemon,
                    randomPokemon,
                    cardPokemon,
                    loadingPokemon,
                    errorPokemon,
                    existPokemon,
                    removePokemon,
                    addPokemon,
                    myPokes,
                    unsavePoke
                }
            }
        >
            {props.children}
        </GameContext.Provider>
    );
}

export {GameContext, GameProvider};