import Title from "./components/Title";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Pomodoros from "./components/Pomodoros";
import './App.css'
import { useEffect, useState } from "react";

function App() {
  const minutes: number = 0.05 * 60;
  const minutesBreak: number = 0.05 * 60;
  let timerInitialTime = minutes;

  const [timer, setTimer] = useState(minutes);
  const [isRunning, setIsRunning] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [pomodoros, setPomodoros] = useState(0);

  //useEffect for work time
  useEffect(() => {
      let interval: number | null = null;

      if(isRunning && timer > 0){
          interval = setInterval(() => {
              setTimer((time) => time - 1);
          }, 1000)
      } else if(timer === 0 && timerInitialTime === minutes){
        setMode("break");
        setTimer(minutesBreak);
        timerInitialTime = minutesBreak;

        if(pomodoros <= 4 && timerInitialTime === minutes){
          setPomodoros(pomodoros + 1);
        } else{
          setPomodoros(0);
        }
      }

      //Showing an alert to the user stating that the time for studying is over
      if(timer === 0){
        alert("Time is up! Now It's time for you to rest");
      }

      return () => {
          if(interval) clearInterval(interval);
      }
  }, [isRunning, timer, mode, pomodoros, timerInitialTime]);
  
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
        <Pomodoros counter={pomodoros} />
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