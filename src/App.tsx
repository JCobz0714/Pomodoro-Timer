import Title from "./components/Title";
import Timer from "./components/Timer";
import Button from "./components/Button";
import './App.css'
import { useEffect, useState } from "react";

function App() {
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

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
    seconds = timer % 60;
    const minutes: number = Math.floor((seconds / 60) - 1);

    return `${minutes.toString()}:${seconds.toString()}`;
  }
  
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <Title />
        <Timer timer={formatTime(timer)}/>
        <div className="flex">
          <Button title="Start timer" onClick={() => setIsRunning(true)} />
          <Button title="Stop timer" onClick={() => setIsRunning(false)} />
        </div>
      </div>
    </>
  )
}

export default App
