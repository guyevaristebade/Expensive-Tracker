import React from 'react'
import type { ResultProps } from '../../types'

export const Result: React.FC<ResultProps> = ({
    title,
    message,
    icon,
    action,
}) => {
    const Icon = icon

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 w-full">
            {Icon && (
                <div className="mb-4 text-4xl text-slate-400">
                    <Icon />
                </div>
            )}

            <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
                {title}
            </h2>

            <p className="mt-2 max-w-md text-sm sm:text-base text-slate-500">
                {message}
            </p>

            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}
