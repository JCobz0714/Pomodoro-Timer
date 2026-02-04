import Title from "./components/Title";
import Timer from "./components/Timer";
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <Title />
        <Timer />
      </div>
    </>
  )
}

export default App
