import type React from 'react'
import { type LucideIcon } from 'lucide-react'

type Props = {
    label: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    placeholder?: string
    IconComponent?: LucideIcon
    type?: string
    className?: string
    name?: string
    value?: string
}

export const Input: React.FC<Props> = ({
    label,
    onChange,
    error,
    placeholder,
    IconComponent,
    type = 'text',
    className,
    name,
    value,
}) => {
    return (
        <div>
            <label className="block text-gray-600 font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                {IconComponent && (
                    <IconComponent
                        size={18}
                        className="absolute left-4 top-4 text-gray-500"
                    />
                )}
                <input
                    type={type}
                    name={name}
                    defaultValue={value}
                    // value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full ${className} border rounded-lg ${IconComponent ? 'pl-12 pr-4 py-3    ' : 'p-3'} text-gray-900 placeholder-gray-500 focus:outline-none transition ${
                        error
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500'
                    }`}
                />
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    )
}
