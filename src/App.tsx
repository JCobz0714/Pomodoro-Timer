import Title from "./components/Title";
import Timer from "./components/Timer";
import Button from "./components/Button";
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <Title />
        <Timer />
        <div className="flex">
          <Button title="Start timer"/>
          <Button title="Stop timer"/>
        </div>
      </div>
    </>
  )
}

export default App
