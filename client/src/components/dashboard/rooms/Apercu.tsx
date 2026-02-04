import React from 'react'
import type { ApercuProps } from '../../../types'

export const Apercu: React.FC<ApercuProps> = ({ name, description, color }) => {
    return (
        <div className="bg-gray-200 rounded-md p-4">
            <span className="text-sm text-gray-500">Aperçu</span>
            <div className="flex items-center gap-4">
                <div
                    className={`h-3 w-3 rounded-full`}
                    style={{ backgroundColor: color }}
                />
                <div>
                    <h4 className="font-bold text-xl">{name}</h4>
                    <span className="text-sm text-gray-500">{description}</span>
                </div>
            </div>
        </div>
    )
}
