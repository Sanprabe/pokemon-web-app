import React from "react";

import { useFetch } from "./DataFetch";

const GameContext = React.createContext();

// Has all the logic of the game in a context so it can be used in all child components
function GameProvider(props){

    // States used to understand what is happening on the app

    const [cardPokemon, setCardPokemon] = React.useState()
    const [existPokemon, setExistPokemon] = React.useState(true);
    const [myPokes, setMyPokes] = React.useState([]);
    const [urlPokemon, setUrlPokemon] = React.useState()
    
    // Get a list with all pokemons and their urls
    
    const {
        error: errorPokemonList,
        loading: loadingPokemonList,
        item: pokemonList
    } = useFetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000');
    

    // Get pokemon given by user (By searchbar or random)
    
    const {
        error: errorPokemon,
        loading: loadingPokemon,
        item: pokemon
    } = useFetch(urlPokemon);

    
    const firstUpdate = React.useRef(true); // This is used so the next useEffect doesn't not run on the first render
    
    React.useEffect(() => {
        
        // Code use so it doesn't  run on first render
        if (firstUpdate.current) { 
            firstUpdate.current = false;
            return;
          }
        
        setCardPokemon(pokemon) // This set the pokemon given by user in the card on Catch me Section
    }, [urlPokemon, pokemon])




    // Search pokemon by searchbar name on searchBar

    const userPokemon = () => {

        setExistPokemon(true) // If last pokemon didn't exist, this might so it's necessary to set the state to true

        // Clean the string so is less likely for the user to have issues looking for a pokemon
        let namePokemonUser = document.getElementById('searchBar-specific-pokemon').value // Gets text on the search bar
        namePokemonUser = namePokemonUser.trim() // Removes white spaces from the begining and the enf of the string
        namePokemonUser = namePokemonUser.replace(/\s/g, '-') // Replace white spaces with '-', so it matches data in the pokemonList

        const pokemonUser = pokemonList.results.filter( obj => (obj.name === namePokemonUser.toLowerCase())) // Looks for the search bar text on pokemonList

        let urlPokemon;

        if (pokemonUser.length === 0){ // If search bar text doesn't match on pokemonList
            setExistPokemon(false) // State that indicates app that this pokemon doesn't exist
            setCardPokemon(undefined) // No pokemon = No card
        }else{ // If pokemon does exist
            urlPokemon = pokemonUser[0].url
            setUrlPokemon(urlPokemon) // Update the url used to set the pokemons card
            document.getElementById('searchBar-specific-pokemon').value = '' // Empty of the searchbar
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