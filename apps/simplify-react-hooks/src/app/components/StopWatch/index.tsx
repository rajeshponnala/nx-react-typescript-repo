import React, {useReducer, useRef, useEffect } from 'react'

interface IState {
    running?: boolean,
    lapse?: number
}

function reducer (currentState: IState,newState: IState): IState {
      return {...currentState,...newState}
}


const StopWatch = () => {
    
    const [{ running, lapse }, setState] = useReducer(reducer, { running: false, lapse: 0});
    
     

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
            setState({ lapse: Date.now() - startTime})
            }, 0)
        }
        setState({ running: !running })
    }

    const handleClearClick = () => {
        clearInterval(setIntervalRef.current)
        setState({ lapse: 0, running: false})
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