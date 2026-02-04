import { type LucideIcon } from 'lucide-react'
import type React from 'react'

type Props = {
    icon: LucideIcon
    description: string
    value: string
    color?: string
    border: string
}

export const StatsCard: React.FC<Props> = ({
    icon,
    description,
    value,
    color,
    border,
}) => {
    const Icon = icon
    return (
        <div
            className={`flex justify-between items-center shadow-md rounded-xl p-4 ${border}`}
        >
            <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-sm">{description}</span>
                <span className="font-bold text-4xl">{value}</span>
            </div>
            <div className={`p-2 rounded-md ${color}`}>
                {<Icon size={24} className={`${color}`} />}
            </div>
        </div>
    )
}
