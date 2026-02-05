export default function Timer(props: TimerProps){
    return (
        <>
            <div className="rounded-full border-6 border-green-500 m-12 p-12 text-3xl">
                <p>{props.timer}</p>
            </div>
        </>
    );
}

interface TimerProps{
    timer: string;
}