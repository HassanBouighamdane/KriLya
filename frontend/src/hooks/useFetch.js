import { useEffect, useState } from "react"


export default function useFetch(url, options){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        fetch(url, options)
        .then(response => response.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [url, options])

    return { data, error, loading }

}