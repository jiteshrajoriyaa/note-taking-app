interface Props {
    label: string;
    type?: string;
    value: string;
    onChange: (val: string) => void;
    error?: string
}

const Input: React.FC<Props> = ({ label, type = 'text', value, onChange, error }) => {
    return <div className="flex flex-col mb-4">
        <label >{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && <span className="text-red-500 text-sm mt-1" >{error}</span>}
    </div>
}

export default Input