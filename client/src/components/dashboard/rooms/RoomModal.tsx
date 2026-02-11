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
  errors,
  isSubmitting,
}) => {
  const isEdit = mode === 'edit'
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md sm:max-w-lg bg-white rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6">
          <h3 className="text-lg sm:text-xl font-semibold">
            {isEdit ? 'Éditer la catégorie' : 'Créer une catégorie'}
          </h3>
          <Button variant="outline" onClick={onClose} className="shrink-0">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <Input
            label="Nom de la catégorie"
            name="name"
            error={errors.name}
            value={formData.name}
            onChange={onChange}
          />
          
          <Input
            label="Description"
            name="description"
            value={formData.description}
            error={errors.description}
            placeholder="example, example..."
            onChange={onChange}
          />
          
          <Input
            label="Couleur"
            type="color"
            name="color"
            error={errors.color}
            value={formData.color}
            onChange={onChange}
          />
          
          <Apercu
            name={formData.name}
            description={formData.description}
            color={formData.color}
          />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 pt-4 sm:pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full py-2.5 sm:py-3 px-4 rounded-md font-semibold text-sm sm:text-base
                bg-gray-500 text-white border-2 border-gray-500
                hover:bg-transparent hover:text-gray-500
                transition cursor-pointer
              "
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full py-2.5 sm:py-3 px-4 rounded-md font-semibold text-sm sm:text-base
                bg-emerald-500 text-white border-2 border-emerald-500
                hover:bg-transparent hover:text-emerald-500
                transition cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? 'En cours...' : isEdit ? 'Sauvegarder' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}