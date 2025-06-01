import { useEffect, useState } from "react";

export function useDebounce(value, delay) { //from medium.com/@sankalpa115
    const [debounceval, setDebounceval] = useState(value)

    useEffect( () => {
        const handler = setTimeout( () => {
            setDebounceval(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    },[value,delay])

    return debounceval
}