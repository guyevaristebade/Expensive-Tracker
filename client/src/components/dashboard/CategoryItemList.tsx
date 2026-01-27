import { Trash } from 'lucide-react'
import type { Category } from './CategoriesPanel'

interface ICategoryItemList {
    selectedCategory : Category
}

export const CategoryItemList : React.FC<ICategoryItemList>= ({selectedCategory}) => {
    return (
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
    )
}
