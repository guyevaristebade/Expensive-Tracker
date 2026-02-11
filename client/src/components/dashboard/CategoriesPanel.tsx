import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { CategoryList } from './CategoryList'
import { CategoryItemList } from './CategoryItemList'
import type {
    Errors,
    CategoriesPanelProps,
    Category,
    ExpenseFormData,
    Files,
} from '../../types'
import { AddExpenseModal } from './AddExpenseModal'
import type React from 'react'

export const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
    categories,
}: CategoriesPanelProps) => {
    const [selectedCategory, setSelectedCategory] = useState<Category>(
        categories[0]
    )
    const [showCatForm, setShowCatForm] = useState<boolean>(false)
    const [showCatItemForm, setShowCatItemForm] = useState<boolean>(false)
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    const colorMap: Record<Category['color'], string> = {
        green: 'bg-green-500',
        orange: 'bg-orange-500',
        indigo: 'bg-indigo-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500',
    }

    const [modalFormData, setModalFormData] = useState<ExpenseFormData>({
        name: '',
        price: '',
        purchaseDate: '',
        description: '',
        roomId: '',
    })

    const [files, setFiles] = useState<Files>({
        invoice: null,
        photo: null,
    })

    const [errors, setErrors] = useState<Errors>({
        name: '',
        price: '',
        purchaseDate: '',
        description: '',
        roomId: '',
        invoice: '',
        photo: '',
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        setFiles((prev) => ({ ...prev, [name]: files && files[0] }))
    }

    const handlerChangeModalForm = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setModalFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' ? Number(value) : value,
        }))
    }

    const handleSubmitItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Simple validation a enlever après
        setErrors({
            name: modalFormData.name ? '' : 'Le nom est requis',
            price: modalFormData.price ? '' : 'Le prix est requis',
            purchaseDate: modalFormData.purchaseDate
                ? ''
                : "La date d'achat est requise",
            description: modalFormData.description
                ? ''
                : 'La description est requise',
            roomId: modalFormData.roomId ? '' : 'La pièce est requise',
            invoice: files.invoice ? '' : 'La facture est requise',
            photo: files.photo ? '' : 'La photo est requise',
        })
        console.log('Submitting item:', modalFormData, files)
    }

    return (
        <div className="space-y-10">
            {/* CATÉGORIES */}
            <section className="rounded-2xl border p-6 space-y-6 shadow-xl border-gray-300">
                <header className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Catégories</h2>
                    <button onClick={() => setShowCatForm(!showCatForm)}>
                        {showCatForm ? (
                            <X className="text-green-600 cursor-pointer" />
                        ) : (
                            <Plus className="text-green-600 cursor-pointer" />
                        )}
                    </button>
                </header>

                {showCatForm && (
                    <form className="relative rounded-xl border border-gray-300 p-4 space-y-4">
                        <input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nom de la catégorie"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-green-600 text-white rounded-lg py-2 cursor-pointer"
                            >
                                Ajouter
                            </button>
                            <button
                                onClick={() => setShowCatForm(false)}
                                className="flex-1 bg-gray-300 rounded-lg py-2 cursor-pointer"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                )}

                <CategoryList
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    colorMap={colorMap}
                    categories={categories}
                />
            </section>

            {/* DÉTAIL CATÉGORIE */}
            <section className="rounded-2xl border p-6 space-y-6 border-gray-300 shadow-xl">
                <header className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            {selectedCategory.name}
                        </h2>
                        <p className="text-gray-500">
                            Total : $
                            {selectedCategory.items.reduce(
                                (total, item) => total + item.amount,
                                0
                            )}
                        </p>
                    </div>
                    {showCatItemForm ? (
                        <X
                            className="text-green-600 cursor-pointer"
                            onClick={() => setShowCatItemForm(!showCatItemForm)}
                        />
                    ) : (
                        <Plus
                            className="text-green-600 cursor-pointer"
                            onClick={() => setShowCatItemForm(!showCatItemForm)}
                        />
                    )}
                </header>

                {showCatItemForm && (
                    <AddExpenseModal
                        onFileChange={handleFileChange}
                        onChange={handlerChangeModalForm}
                        expenseFormData={modalFormData}
                        errors={errors}
                        onClose={() => setShowCatItemForm(false)}
                        rooms={[{
                            name: 'dsfsdfs', id: '1', owner_id: "dddd",
                            color: '',
                            description: '',
                            created_at: '',
                            updated_at: '',
                            total_price: 0,
                            total_items: 0
                        }]}
                        onSubmit={handleSubmitItem}
                    />
                )}
                <CategoryItemList selectedCategory={selectedCategory} />
            </section>
        </div>
    )
}
