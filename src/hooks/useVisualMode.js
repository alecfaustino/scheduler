import { useState } from "react";
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false){
    if(replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
    setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    setHistory(prev => {
      // if we're already at the initial, don't change it
      if(prev.length <= 1) {
        return prev;
      }
      return [...prev.slice(0, prev.length - 1)]
    })
  }

  return { mode: history[history.length -1], transition, back };
}