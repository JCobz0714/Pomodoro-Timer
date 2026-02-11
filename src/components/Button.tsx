export default function Button(props: ButtonProps){
    return (
        <>
            <button className="bg-green-400 text-green-100 rounded-lg p-2 mx-4"
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