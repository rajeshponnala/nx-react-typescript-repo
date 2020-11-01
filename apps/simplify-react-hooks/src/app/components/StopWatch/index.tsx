import React, { useState, useRef, useEffect } from 'react'


const StopWatch = () => {
    const [lapse, setLapse] = useState(0)  
    const [running, setRunning] = useState(false)
    const setIntervalRef = useRef(null)

    useEffect(() => {
        return () => clearInterval(setIntervalRef.current)
    },[])

    const handleRunClick = () => {
        if(running) {
             clearInterval(setIntervalRef.current)
        } else {
            const startTime = Date.now() - lapse
           setIntervalRef.current =  setInterval(() => {
                setLapse(Date.now() - startTime)
            }, 0)
        }
        setRunning(!running)
    }

    const handleClearClick = () => {
        clearInterval(setIntervalRef.current)
        setLapse(0)
        setRunning(false)
    }

    return (
          <div style={{ textAlign: 'center' }} aria-labelledby="lapse-label">
              <label id="lapse-label" style={{ fontSize: '5em', display: 'block' }}>
                {lapse} ms
              </label>
              <button onClick={handleRunClick}>{ running? 'Stop': 'Start'}</button>
           <button onClick={handleClearClick}>Clear</button>
          </div>
      )
}

export default StopWatch