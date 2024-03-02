import { useEffect, useState } from "react"


export default function useFetch(url){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [url])

    return { data, error, loading }

}