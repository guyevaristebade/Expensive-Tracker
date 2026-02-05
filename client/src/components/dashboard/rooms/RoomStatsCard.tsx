import React from 'react'
import type { RoomStatsCardProps } from '../../../types'

export const RoomStatsCard: React.FC<RoomStatsCardProps> = ({
    title,
    value,
    icon,
    color,
    border,
    bg,
}) => {
    const Icon = icon

    return (
        <div
            className={`flex justify-between items-center shadow-md rounded-xl p-4 ${border} ${bg}`}
        >
            <div className="flex flex-col gap-2">
                <span className={`text-gray-400 text-sm ${color}`}>
                    {title}
                </span>
                <span className={`font-bold text-4xl ${color}`}>{value}</span>
            </div>
            <div className={`p-2 rounded-md ${color}`}>
                {<Icon size={24} className={`${color}`} />}
            </div>
        </div>
    )
}
