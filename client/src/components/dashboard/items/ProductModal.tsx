import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '../../ui/Input'
import { useAuth, useItems } from '@/hooks'

type ProductFormData = {
    name: string
    price: string
    purchase_date: string
    description: string
    invoice_url: string
    image_url: string
    invoice_file: File | null
    image_file: File | null
}

type Props = {
    color?: string
    onClose: () => void
    roomId: string
    // onSubmit: (data: ProductFormData) => void
    mode: 'create' | 'edit'
    initialData?: Partial<ProductFormData>
}

export const ProductModal: React.FC<Props> = ({
    color,
    onClose,
    roomId,
    // onSubmit,
    mode,
    initialData = {},
}) => {
    const { user } = useAuth()
    const { postItem } = useItems()
    const [formData, setFormData] = useState<ProductFormData>({
        name: initialData.name || '',
        price: initialData.price || '',
        purchase_date:
            initialData.purchase_date || new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        invoice_url: initialData.invoice_url || '',
        image_url: initialData.image_url || '',
        invoice_file: null,
        image_file: null,
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof ProductFormData, string>>
    >({})
    const [invoiceMethod, setInvoiceMethod] = useState<'url' | 'file'>('url')
    const [imageMethod, setImageMethod] = useState<'url' | 'file'>('url')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name as keyof ProductFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleInvoiceFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, invoice_file: file }))
    }

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, image_file: file }))
    }

    const resetFormatData = () => {
        setFormData({
            name: '',
            price: '',
            purchase_date: new Date().toISOString().split('T')[0],
            description: '',
            invoice_url: '',
            image_url: '',
            invoice_file: null,
            image_file: null,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Partial<Record<keyof ProductFormData, string>> = {}

        if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
        if (!formData.price.trim()) newErrors.price = 'Le montant est requis'
        if (!formData.purchase_date)
            newErrors.purchase_date = 'La date est requise'
        if (formData.invoice_url && invoiceMethod === 'url') {
            try {
                new URL(formData.invoice_url)
            } catch {
                newErrors.invoice_url = 'URL de facture invalide'
            }
        }

        if (formData.image_url && imageMethod === 'url') {
            try {
                new URL(formData.image_url)
            } catch {
                newErrors.image_url = "URL d'image invalide"
            }
        }

        if (formData.invoice_file && invoiceMethod === 'file') {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

            if (!allowedTypes.includes(formData.invoice_file.type)) {
                newErrors.invoice_file = 'Type de fichier de facture invalide'
            }
        }

        if (formData.image_file && imageMethod === 'file') {
            if (!formData.image_file.type.startsWith('image/')) {
                newErrors.image_file = 'Le fichier doit être une image'
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        postItem.mutate(
            { formData, roomId, userId: user?.id as string },
            {
                onSuccess: () => {
                    alert('Item ajouté avec succès !')
                    resetFormatData()
                    onClose()
                },
            }
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 rounded-t-3xl px-6 py-5 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {mode === 'create'
                            ? 'Ajouter un article'
                            : "Modifier l'article"}
                    </h2>
                    <button
                        style={{
                            backgroundColor: color,
                            borderColor: color,
                            border: '1px solid',
                        }}
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Fermer"
                    >
                        <X size={28} className="text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                    {/* Name */}
                    <Input
                        label="Nom de l'article"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Veste, Chaussures..."
                        error={errors.name}
                    />

                    {/* Price */}
                    <Input
                        label="Montant ($)"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        error={errors.price}
                        className="text-lg"
                    />

                    {/* Date */}
                    <Input
                        label="Date"
                        name="purchase_date"
                        type="date"
                        value={formData.purchase_date}
                        onChange={handleChange}
                        error={errors.purchase_date}
                        className="text-lg"
                    />

                    {/* Description */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Notes (optionnel)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Ajouter des notes..."
                            rows={4}
                            className="w-full border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none transition border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 resize-none"
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Invoice Section */}
                    {/* <div className="space-y-3"> */}
                    {/* <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setInvoiceMethod('url')
                                    setFormData((prev) => ({
                                        ...prev,
                                        invoice_file: null,
                                    }))
                                }}
                                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    invoiceMethod === 'url'
                                        ? 'bg-green-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                                }`}
                            >
                                <Link size={16} />
                                URL
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setInvoiceMethod('file')
                                    setFormData((prev) => ({
                                        ...prev,
                                        invoice_url: '',
                                    }))
                                }}
                                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2  cursor-pointer${
                                    invoiceMethod === 'file'
                                        ? 'bg-green-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                                }`}
                            >
                                <FileText size={16} />
                                Fichier
                            </button>
                        </div> */}
                    {/* <Input
                            label=""
                            name="invoice_url"
                            value={formData.invoice_url}
                            onChange={handleChange}
                            error={errors.invoice_url}
                            placeholder="https://exemple.com/facture.pdf"
                        /> */}
                    {/* {invoiceMethod === 'url' ? (
                            <Input
                                label=""
                                name="invoice_url"
                                value={formData.invoice_url}
                                onChange={handleChange}
                                error={errors.invoice_url}
                                placeholder="https://exemple.com/facture.pdf"
                            />
                        ) : (
                            <div>
                                <FileInput
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    label="Cliquez ou glissez un fichier de facture"
                                    name={
                                        formData.invoice_file
                                            ? formData.invoice_file.name
                                            : 'invoice_file'
                                    }
                                    onChange={handleInvoiceFileChange}
                                />
                                {errors.invoice_file && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.invoice_file}
                                    </p>
                                )}
                            </div>
                            // <div className="relative">
                            //     <input
                            //         type="file"
                            //         accept=".pdf,.jpg,.jpeg,.png"
                            //         onChange={handleInvoiceFileChange}
                            //         className="hidden"
                            //     />
                            //     <label
                            //         htmlFor="invoice-file"
                            //         className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-green-500 hover:bg-gray-50 transition-all"
                            //     >
                            //         <div className="text-center">
                            //             <Upload
                            //                 size={28}
                            //                 className="mx-auto text-gray-400 mb-2"
                            //             />
                            //             <p className="text-sm text-gray-600 font-medium">
                            //                 {formData.invoice_file
                            //                     ? formData.invoice_file.name
                            //                     : 'Cliquez pour télécharger un fichier'}
                            //             </p>
                            //         </div>
                            //     </label>
                            // </div>
                        )} */}
                    {/* </div> */}

                    {/* Image Section */}
                    <div className="space-y-3">
                        {/* <label className="block text-gray-600 font-medium">
                            Image (optionnel)
                        </label> */}

                        {/* <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setImageMethod('url')
                                    setFormData((prev) => ({
                                        ...prev,
                                        image_file: null,
                                    }))
                                }}
                                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                    imageMethod === 'url'
                                        ? 'bg-green-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                                }`}
                            >
                                <Link size={16} />
                                URL
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setImageMethod('file')
                                    setFormData((prev) => ({
                                        ...prev,
                                        image_url: '',
                                    }))
                                }}
                                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                    imageMethod === 'file'
                                        ? 'bg-green-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                                }`}
                            >
                                <ImageIcon size={16} />
                                Fichier
                            </button>
                        </div> */}
                        <Input
                            label="Image (optionnel)"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            error={errors.image_url}
                            placeholder="https://exemple.com/image.jpg"
                        />
                        {/* {imageMethod === 'url' ? (
                            <Input
                                label=""
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                error={errors.image_url}
                                placeholder="https://exemple.com/image.jpg"
                            />
                        ) : (
                            <div className="relative">
                                <FileInput
                                    accept="image/*"
                                    label="Cliquez ou glissez un fichier image"
                                    name={
                                        formData.image_file
                                            ? formData.image_file.name
                                            : 'image_file'
                                    }
                                    onChange={handleImageFileChange}
                                />
                                {errors.image_file && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.image_file}
                                    </p>
                                )}
                            </div>
                        )} */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-lg cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3.5 bg-linear-to-r from-pink-400 to-pink-500 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all shadow-md hover:shadow-lg text-lg cursor-pointer"
                        >
                            {mode === 'create' ? 'Ajouter' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
