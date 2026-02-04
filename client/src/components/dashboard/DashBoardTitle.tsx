import React from 'react'
import type { DashBoardTitleProps } from '../../types'
import { ArrowLeft } from 'lucide-react'

export const DashBoardTitle: React.FC<DashBoardTitleProps> = ({
    title,
    subtitle,
    isDetailed,
    color,
    onClick,
}) => {
    return !isDetailed ? (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
            </h1>
            <span className="text-gray-500 text-sm md:text-base">
                {subtitle}
            </span>
        </div>
    ) : (
        <div className="flex items-center gap-5">
            <button
                type="button"
                aria-label="Go back"
                className="cursor-pointer"
            >
                <ArrowLeft
                    size={24}
                    className="text-gray-600"
                    onClick={onClick}
                />
            </button>
            <div>
                <div className="flex items-center gap-4">
                    <div
                        className={`h-5 w-5 rounded-full`}
                        style={{ backgroundColor: color }}
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {title}
                    </h1>
                </div>
                <span className="text-gray-400 text-sm md:text-base">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}
