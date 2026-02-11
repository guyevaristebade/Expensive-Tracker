import React, { useEffect, useRef, useState } from 'react'
import { Edit, Info, Trash } from 'lucide-react'
import type { RoomCardProps } from '../../../types'
import { Link } from 'react-router-dom'
import { parseDate } from '../../../utils'

export const RoomCard: React.FC<RoomCardProps> = ({
    room,
    onChecked,
    onDelete,
    onEdit,
    checked,
}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const confirmRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                confirmRef.current &&
                !confirmRef.current.contains(e.target as Node)
            ) {
                setConfirmOpen(false)
            } else {
                setConfirmOpen(true)
            }
        }

        if (confirmOpen) {
            document.addEventListener('mousedown', handler)
        }

        return () => document.removeEventListener('mousedown', handler)
    }, [confirmOpen])

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-md">
            {/* Bande colorée */}
            <div
                className="h-2 w-full"
                style={{ backgroundColor: room.color }}
            />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <input
                        className="cursor-pointer h-6 w-6"
                        type="checkbox"
                        checked={checked}
                        onChange={onChecked}
                    />

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {room.name}
                        </h2>
                        {room.description && (
                            <p className="text-sm text-gray-400">
                                {room.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between rounded-lg bg-gray-50 px-6 py-4 w-full ">
                    <div className="space-y-1 w-full flex-1">
                        <span className="text-xs font-medium uppercase text-gray-500">
                            Montant
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                            {'$'}
                            {room.total_price}
                        </p>
                    </div>

                    <div className="space-y-1 text-left flex-1">
                        <span className="text-xs font-medium uppercase text-gray-500">
                            Articles
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                            {room.total_items}
                        </p>
                    </div>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-400">
                    Mis à jour le {parseDate(room.updated_at)}
                </p>

                {/* Actions */}
                <div className="relative flex gap-4">
                    <button
                        onClick={onEdit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-100 py-3 text-green-700 hover:bg-green-200 cursor-pointer"
                    >
                        <Edit size={16} />
                        Éditer
                    </button>
                    <Link
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 py-3 text-blue-700 hover:bg-blue-200 cursor-pointer"
                        to={`/rooms/${room.id}`}
                    >
                        <Info size={16} />
                        Plus d'infos
                    </Link>

                    <button
                        onClick={() => setConfirmOpen(true)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 py-3 text-red-700 hover:bg-red-200 cursor-pointer"
                    >
                        <Trash size={16} />
                        Supprimer
                    </button>

                    {/* CONFIRMATION */}
                    {confirmOpen && (
                        <div
                            ref={confirmRef}
                            className="absolute bottom-full right-0 mb-3 w-64 rounded-lg border bg-white p-4 shadow-lg z-20"
                        >
                            <p className="text-sm font-medium text-gray-900">
                                Supprimer cette pièce ?
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Cette action est définitive.
                            </p>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => setConfirmOpen(false)}
                                    className="cursor-pointer rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                                >
                                    Non
                                </button>

                                <button
                                    onClick={() => {
                                        setConfirmOpen(false)
                                        onDelete?.()
                                    }}
                                    className="cursor-pointer rounded-md bg-red-100 text-red-700 px-3 py-1.5 text-sm  hover:bg-red-200"
                                >
                                    Oui
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
