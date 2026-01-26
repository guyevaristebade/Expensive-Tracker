// components/ui/Button.tsx
type Props = {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'white'
    onClick?: () => void
    className?: string
}

export const Button = ({
    children,
    variant = 'primary',
    onClick,
    className,
}: Props) => {
    const styles = {
        primary:
            'bg-emerald-500 text-white hover:bg-white hover:text-black hover:border-2 hover:text-emerald-500',
        secondary:
            'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white',
        outline: 'hover:text-emerald-500',
        white: 'bg-white text-emerald-500 font-bold',
    }

    return (
        <button
            onClick={onClick}
            className={`p-3 rounded-lg transition-all cursor-pointer ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
