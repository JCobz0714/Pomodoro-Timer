export default function Pomodoros(props: PomodorosProps){
    return (
        <>
            <div className="text-green-400 text-2xl">
                {props.counter === 0 ? 
                `You have no pomodoros so far, what are you waiting for?` : 
                `You have ${props.counter} pomodoros so far!`
                }
            </div>
        </>
    )
}

interface PomodorosProps{
    counter: number;
}