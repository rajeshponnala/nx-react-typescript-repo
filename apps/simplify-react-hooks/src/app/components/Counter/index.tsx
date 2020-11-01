import React,{ useState, useEffect } from 'react'

interface IUseCounterProps {
    initialState: number,
    step: number
}

// custom hook
export const useCounter = ({initialState, step}: IUseCounterProps) => {
    const [count,setCount] = useState(() => initialState)
    const increment = () => setCount(count + step)
    return { count, increment }
}


const Counter = () => {
    
    const [count,setCount] = useState(() => Number( window.localStorage.getItem('count') || 0))
    const increment = () => setCount(count + 1)
    useEffect(() => {
        window.localStorage.setItem('count', count.toString())
    },[count])
    return (
    <button onClick={increment}>{count}</button>
    )
}

export default Counter