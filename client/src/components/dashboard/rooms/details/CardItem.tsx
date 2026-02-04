import React from 'react'
import { Edit, Trash, Info } from 'lucide-react'

export type CardItemProps = {
    image: string
    name: string
    description?: string
    price: number
    purchaseDate: string
    onEdit?: () => void
    onDelete?: () => void
    onMoreInfo?: () => void
}

export const CardItem: React.FC<CardItemProps> = ({
    image,
    name,
    description,
    price,
    purchaseDate,
    onEdit,
    onDelete,
    onMoreInfo,
}) => {
    return (
        <div className="group flex flex-col md:flex-row gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            {/* Image */}
            <div className="h-32 w-full md:w-40 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between gap-3 overflow-auto">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {name}
                        </h3>

                        <span className="text-lg font-bold text-emerald-600">
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                        Acheté le {purchaseDate}
                    </p>

                    {description && (
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <button
                        onClick={onEdit}
                        className="
              flex items-center justify-center gap-2 rounded-lg bg-emerald-100 py-2 px-3 text-emerald-700 hover:bg-emerald-200 transition cursor-pointer
            "
                    >
                        <Edit size={16} />
                        Éditer
                    </button>

                    <button
                        onClick={onDelete}
                        className="
                                flex items-center justify-center gap-2 rounded-lg bg-red-100 py-2 px-3 text-red-700 hover:bg-red-200 transition cursor-pointer
                                "
                    >
                        <Trash size={16} />
                        Supprimer
                    </button>

                    <button
                        onClick={onMoreInfo}
                        className="
                                flex items-center justify-center gap-2 rounded-lg bg-blue-100 py-2 px-3 text-blue-700 hover:bg-blue-200 transition cursor-pointer
                                "
                    >
                        <Info size={16} />
                        Plus d’infos
                    </button>
                </div>
            </div>
        </div>
    )
}
