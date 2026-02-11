import Title from "./components/Title";
import Timer from "./components/Timer";
import Button from "./components/Button";
import './App.css'
import { useEffect, useState } from "react";

function App() {
  const minutes: number = 0.05 * 60;

  const [timer, setTimer] = useState(minutes);
  const [isRunning, setIsRunning] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
      let interval: number | null = null;

      if(isRunning && timer > 0){
          interval = setInterval(() => {
              setTimer((time) => time - 1);
          }, 1000)
      }

      return () => {
          if(interval) clearInterval(interval);
      }
  }, [isRunning, timer]);
  
  const formatTime = (seconds: number) => {
    const minutes: number = Math.floor((seconds / 60));
    seconds = timer % 60;

    //padStart is for showing 2 digits (or any quantity you want) instead 
    // of just one
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <Title />
        <Timer timer={formatTime(timer)}/>
        <div className="flex">
          <Button title="Start timer" onClick={() => setIsRunning(true)} />
          <Button title="Stop timer" onClick={() => {
            setIsRunning(false);
            setShowButton(true);
            }}
          //Sending the disabled prop so the user can't click if the timer hasn't started
          disabled={timer === minutes ? true : false}
          />
        </div>
        <div className="mt-4">
          {(showButton || timer === 0) ? <Button title="Reset timer" onClick={() => {
            setShowButton(false);
            setTimer(minutes);
            setIsRunning(false);
          }} /> : undefined}
        </div>
      </div>
    </>
  )
}

export default App