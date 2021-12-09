import React from 'react'
import axios from 'axios'

function useFetch(url) {

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState();

    // Gets the data from the Api each time the url changes
    React.useEffect(() => {
        axios.get(url)
            .then(res => {
                setItem(res.data);
            })
            .catch( err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [url])

    return {
        error,
        loading,
        item
    }
}


export { useFetch }
