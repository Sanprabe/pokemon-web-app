import React from 'react'
import axios from 'axios'

function useFetch(url) {

    // let initialValue;
    // let url = `https://pokeapi.co/api/v2/pokemon${extension_url}`;

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState();

    React.useEffect(() => {
        // console.log(loading)
        setTimeout(() =>{
            axios.get(url)
                .then(res => {
                    // console.log(res.data);
                    setItem(res.data);
                })
                .catch( err => {
                    // console.error(err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }, 1000)
        // console.log(loading)
    }, [url])

    return {
        error,
        loading,
        item
    }
}


export { useFetch }
