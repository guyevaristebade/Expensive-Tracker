import { Trash } from 'lucide-react'
import type React from 'react'
import type { Category } from '../../types'

type Props = {
    selectedCategory: Category
}

export const CategoryItemList: React.FC<Props> = ({ selectedCategory }) => {
    return (
        <>
            {selectedCategory.items.length > 0 ? (
                <ul className="space-y-4 ">
                    {selectedCategory.items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-4 py-4"
                        >
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-500">${item.amount}</p>
                            </div>
                            <Trash className="text-red-500 cursor-pointer" />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex items-center justify-center p-8">
                    <p className="text-gray-400">
                        {' '}
                        Aucune dépense dans cette catégorie
                    </p>
                </div>
            )}
        </>
    )
}
