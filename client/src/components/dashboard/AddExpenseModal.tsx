import { Calendar, Contact, DollarSign, X } from 'lucide-react'
import { Button } from '../ui/Button'
import type { AddExpenseModalProps } from '../../types'
import { FileInput } from '../ui/FileInput'
import { Input } from '../ui/Input'
import React from 'react'

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
    errors,
    onClose,
    rooms,
    onChange,
    onFileChange,
    onSubmit,
    expenseFormData,
}: AddExpenseModalProps) => {
    return (
        <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-xl rounded-2xl shadow-2xl bg-white p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Nouvelle dépense</h2>
                    <Button variant="outline" onClick={onClose}>
                        <X />
                    </Button>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Input
                        label="Nom de la dépense"
                        name="name"
                        onChange={onChange}
                        error={errors.name}
                        value={expenseFormData.name}
                        type="text"
                        placeholder="Nom de la dépense"
                        IconComponent={Contact}
                    />
                    <Input
                        label="Prix"
                        name="price"
                        onChange={onChange}
                        error={errors.price}
                        value={expenseFormData.price?.toString() || ''}
                        type="number"
                        placeholder="250"
                        IconComponent={DollarSign}
                    />
                    <Input
                        type="date"
                        label="Date"
                        name="purchaseDate"
                        onChange={onChange}
                        value={expenseFormData.purchaseDate}
                        error={errors.purchaseDate}
                        IconComponent={Calendar}
                    />

                    <div className="flex flex-col gap-2">
                        <textarea
                            defaultValue={expenseFormData.description}
                            onChange={onChange}
                            placeholder="Description"
                            name="description"
                            className={`w-full border rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition ${
                                errors.description
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500'
                            }`}
                        />
                        {errors.description && (
                            <span className="text-red-500 bg-red-200 p-2 rounded-md ">
                                {errors.description}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <select
                            name="roomId"
                            onChange={onChange}
                            className="border rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition "
                        >
                            <option defaultValue="" className="text-gray-400">
                                Sélectionner une pièce
                            </option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                        {errors.roomId && (
                            <span className="text-red-500 bg-red-200 p-2 rounded-md ">
                                {errors.roomId}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FileInput
                            name="invoice"
                            label="Facture"
                            accept=".pdf,.jpg,.png"
                            onChange={onFileChange}
                        />
                        <FileInput
                            name="photo"
                            label="Photo"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="flex-1 rounded-lg bg-green-600 py-2 text-white cursor-pointer"
                            type="submit"
                        >
                            Ajouter
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-lg bg-gray-300 py-2 cursor-pointer"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
