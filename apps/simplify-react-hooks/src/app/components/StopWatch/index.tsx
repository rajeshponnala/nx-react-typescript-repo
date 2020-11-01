import { stat } from 'fs';
import React, {useReducer, useState, useRef, useEffect } from 'react'

interface IState {
    running: boolean,
    lapse: number
}

type Action = { type: 'LAPSE',now: number, startTime: number } | {
    type: 'TOGGLE_RUNNING',
} | { type: 'CLEAR' }


function reducer (state: IState,action: Action): IState {
      switch(action.type) {
          case 'LAPSE':
              return {...state, lapse: action.now - action.startTime}
          case 'TOGGLE_RUNNING':
              return {
                  ...state,
                  running: !state.running
              }
           case  'CLEAR': 
             return {
                 ...state,
                 running: false,
                 lapse: 0
             }
          default:
              return state    
      }
}


const StopWatch = () => {
    
    const [{ running, lapse }, dispatch] = useReducer(reducer, { running: false, lapse: 0});
    
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
            dispatch({ type: 'LAPSE', now: Date.now(), startTime })
            }, 0)
        }
        dispatch({ type: 'TOGGLE_RUNNING'})
    }

    const handleClearClick = () => {
        clearInterval(setIntervalRef.current)
        dispatch({type: 'CLEAR'})
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