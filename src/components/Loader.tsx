interface LoaderProps {
    label?: string;
    inline?: boolean;
}

export default function Loader({ label = 'Loading…', inline = false }: LoaderProps) {
    return (
        <div className={`loader ${inline ? 'loader--inline' : ''}`} role="status" aria-live="polite">
            <svg width="56" height="56" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="13.5" stroke="#1F4D3A" strokeWidth="2" />
                <g className="loader__needle">
                    <path d="M16 6.5l4 9.5h-8z" fill="#B34A22" />
                    <path d="M16 25.5l-4-9.5h8z" fill="#1F4D3A" />
                </g>
            </svg>
            <p className="loader__label">{label}</p>
        </div>
    );
}