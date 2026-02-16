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
  const [mode, setMode] = useState<"work" | "break">("work");

  //Setting the pomodoros value by checking if the counter has moved or not (first pomodoro)
  const [pomodoros, setPomodoros] = useState(() => {
    const saved = localStorage.getItem("pomodoros");
    return saved ? Number(saved) : 0;
  });

  //Saving the pomodoro counter in local storage so if the user refreshes the page, the progress
  // won't be lost
  useEffect(() => {
    localStorage.setItem("pomodoros", pomodoros.toString());
  }, [pomodoros]);
  
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
        <Button title="Reset pomodoros" disabled={pomodoros === 0 ? true : false} 
        onClick={() => {
          setPomodoros(0);
        }}
        />
        <Timer timer={formatTime(timer)}/>
        <div className="flex">
          <Button title="Start timer" onClick={() => setIsRunning(true)} />
          <Button title="Stop timer" onClick={() => {
            setIsRunning(false);
            }}
          //Sending the disabled prop so the user can't click if the timer hasn't started
          disabled={timer === minutes}
          />
        </div>
        <div className="mt-4">
          <Button title="Reset timer" disabled={isRunning || timer === minutes} 
          onClick={() =>{
            setTimer(minutes);
            setIsRunning(false);
          }} />
        </div>
      </div>
    </>
  )
}

export default App