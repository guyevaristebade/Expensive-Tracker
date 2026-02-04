import React from 'react'
import { X } from 'lucide-react'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Apercu } from './Apercu'
import type { RoomModalProps } from '../../../types'

export const RoomModal: React.FC<RoomModalProps> = ({
    mode,
    onClose,
    onSubmit,
    formData,
    onChange,
}) => {
    const isEdit = mode === 'edit'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8">
                    <h3 className="text-2xl font-semibold">
                        {isEdit ? 'Éditer la catégorie' : 'Créer une catégorie'}
                    </h3>
                    <Button variant="outline" onClick={onClose}>
                        <X />
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4 p-8">
                    <Input
                        label="Nom de la catégorie"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                    />

                    <Input
                        label="Description"
                        name="description"
                        value={formData.description}
                        placeholder="example, example..."
                        onChange={onChange}
                    />

                    <Input
                        label="Couleur"
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={onChange}
                    />

                    <Apercu
                        name={formData.name}
                        description={formData.description}
                        color={formData.color}
                    />

                    {/* Actions */}
                    <div className="flex justify-between gap-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                w-full p-4 rounded-md font-semibold
                bg-gray-500 text-white border-2 border-gray-500
                hover:bg-transparent hover:text-gray-500
                transition cursor-pointer
              "
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            className="
                w-full p-4 rounded-md font-semibold
                bg-emerald-500 text-white border-2 border-emerald-500
                hover:bg-transparent hover:text-emerald-500
                transition cursor-pointer
              "
                        >
                            {isEdit ? 'Sauvegarder' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
