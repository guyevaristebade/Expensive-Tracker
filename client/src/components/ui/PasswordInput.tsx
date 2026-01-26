import React from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    showPassword: boolean
    toggleShowPassword: () => void
    placeholder?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    value,
    onChange,
    error,
    showPassword,
    toggleShowPassword,
    placeholder,
}) => {
    return (
        <div>
            <label className="block text-gray-300 font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-500"
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-gray-700 border rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition ${
                        error
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : 'border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500'
                    }`}
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    )
}
