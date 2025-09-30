interface Props {
    text: string,
    onClick?: () => void | Promise<void>,
    type?: 'button' | 'submit'
    disabled?: boolean
}

const Button: React.FC<Props> = ({ text, onClick, type = "button", disabled }) => {
    return <button
        type={type}
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer disabled:cursor-not-allowed"
        disabled={disabled}
    >
        {text}
    </button>
}

export default Button