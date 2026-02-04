// // components/ui/Button.tsx
import type React from 'react'

type Props = {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'white'
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<Props> = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    type,
}) => {
    const styles = {
        primary: `
      bg-emerald-500
      text-white
      border-2 border-transparent
      hover:bg-white
      hover:text-emerald-500
      hover:border-emerald-500
      `,
        secondary: `
      border-2 border-emerald-500
      text-emerald-500
      hover:bg-emerald-500
      hover:text-white
      `,
        outline: `
      border-2 border-transparent
      text-black
      hover:border-emerald-500
      hover:text-emerald-500
      `,
        white: `
      bg-white
      text-emerald-500
      font-bold
      border-2 border-transparent
      hover:border-emerald-500
      `,
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        p-3
        rounded-lg
        cursor-pointer
        transition-colors duration-200
        ${styles[variant]}
        ${className}
      `}
        >
            {children}
        </button>
    )
}
