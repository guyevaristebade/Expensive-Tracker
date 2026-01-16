import React from 'react'
import { Icon } from 'lucide-react'

interface TextInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    placeholder?: string
    IconComponent?: Icon
    type?: string
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChange,
    error,
    placeholder,
    IconComponent,
    type = 'text',
}) => {
    return (
        <div>
            <label className="block text-gray-300 font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                {IconComponent && (
                    <IconComponent
                        size={18}
                        className="absolute left-4 top-3.5 text-gray-500"
                    />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-gray-700 border rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition ${
                        error
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : 'border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500'
                    }`}
                />
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    )
}
