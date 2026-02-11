export default function Button(props: ButtonProps){
    return (
        <>
            <button className={`rounded-lg p-2 mx-4 ${props.disabled ? 'bg-gray-400 text-gray 100' : 'bg-green-400 text-green-100'}`}
            onClick={props.onClick}
            disabled={props.disabled}
            >
                {props.title}
            </button>
        </>
    );
}

interface ButtonProps{
    title: string;
    onClick?: () => void;
    disabled?: boolean;
}