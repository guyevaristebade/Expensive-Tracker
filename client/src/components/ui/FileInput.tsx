import { Upload } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

type Props = {
    label: string
    name: string
    accept?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FileInput: React.FC<Props> = ({
    label,
    name,
    accept,
    onChange,
}: Props) => {
    const [fileName, setFileName] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        setFileName(file?.name || null)
        onChange?.(e)
    }

    return (
        <label
            htmlFor={name}
            className="flex flex-col items-center justify-center gap-2
                rounded-xl border-2 border-dashed border-gray-300
                p-6 cursor-pointer hover:border-green-500 hover:bg-green-50
                transition"
        >
            <Upload className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-xs text-gray-500">
                Clique ou glisse un fichier
            </span>
            {fileName && (
                <span className="text-xs text-green-500 font-medium">
                    {fileName}
                </span>
            )}

            <input
                id={name}
                onChange={handleChange}
                name={name}
                type="file"
                accept={accept}
                className="hidden"
            />
        </label>
    )
}
