import React from 'react'
import type { CategoriesPanelProps, Category } from './CategoriesPanel'

interface CategoryList extends CategoriesPanelProps {
    selectedCategory : Category;
    setSelectedCategory : (cat : Category) => void;
    colorMap :Record<Category['color'], string>
}

export const CategoryList : React.FC<CategoryList> = ({categories, selectedCategory, setSelectedCategory,colorMap}) => {
  return (
    <ul className="space-y-4">
    {categories.map((cat) => (
      <li key={cat.id}>
        <button
          onClick={() => setSelectedCategory(cat)}
          className={`
            w-full flex items-center justify-between rounded-xl border border-gray-300 px-4 py-4 cursor-pointer
            ${selectedCategory.id === cat.id
              ? 'bg-green-100 border-green-500'
              : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${colorMap[cat.color]}`} />
            <span className="font-semibold">{cat.name}</span>
          </div>
          <span>{cat.items.length}</span>
        </button>
      </li>
    ))}
  </ul>
  )
}
