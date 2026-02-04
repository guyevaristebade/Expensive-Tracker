import type React from 'react'

type Props = {
    displayName: string
    size: 'sm' | 'md' | 'xl'
}

export const Avatar: React.FC<Props> = ({ displayName, size }) => {
    const getStyleBySize = (size: string) => {
        switch (size) {
            case 'sm':
                return 'w-8 h-8 p-4 text-xl'

            case 'md':
                return 'w-12 h-12 p-6 text-3xl'

            case 'xl':
                return 'w-16 h-16 p-8 text-5xl'
            default:
                return 'w-8 h-8 p-4 text-xl'
        }
    }

    return (
        <div
            className={`flex justify-center items-center rounded-full ${getStyleBySize(size)}  text-white font-bold bg-linear-to-br from-emerald-500 to-orange-300`}
        >
            {displayName.charAt(0)}
        </div>
    )
}
