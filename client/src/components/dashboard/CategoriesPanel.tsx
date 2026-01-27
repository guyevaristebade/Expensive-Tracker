import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { CategoryList } from './CategoryList';
import { CategoryItemList } from './CategoryItemList';

export interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
}


export interface Category {
  id: number;
  name: string;
  color: 'green' | 'orange' | 'indigo' | 'blue' | 'red';
  items: ExpenseItem[];
}


export interface CategoriesPanelProps {
  categories: Category[];
}

export const CategoriesPanel = ({ categories }: CategoriesPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [showCatForm, setShowCatForm] = useState<boolean>(false);
  const [showCatItemForm, setShowCatItemForm] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const colorMap: Record<Category['color'], string> = {
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };
  
  return (
    <div className="space-y-10">
      {/* CATÉGORIES */}
      <section className="rounded-2xl border p-6 space-y-6 shadow-xl border-gray-300">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Catégories</h2>
          <button onClick={() => setShowCatForm(!showCatForm)}>
            {showCatForm ?  <X  className="text-green-600 cursor-pointer" /> : <Plus className="text-green-600 cursor-pointer" />}
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
              <button type='submit' className="flex-1 bg-green-600 text-white rounded-lg py-2 cursor-pointer">
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
            <h2 className="text-xl font-bold">{selectedCategory.name}</h2>
            <p className="text-gray-500">
              Total : $
              {selectedCategory.items.reduce(
                (total, item) => total + item.amount,
                0
              )}
            </p>
          </div>
        { showCatItemForm ? <X className="text-green-600 cursor-pointer" onClick={() => setShowCatItemForm(!showCatItemForm)}/>:  <Plus className="text-green-600 cursor-pointer" onClick={() => setShowCatItemForm(!showCatItemForm)}/>}
        </header>

        {showCatItemForm && (
          <form className="relative rounded-xl border border-gray-300 p-4 space-y-4">
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nom de la catégorie"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            <div className="flex gap-4">
              <button type='submit' className="flex-1 bg-green-600 text-white rounded-lg py-2 cursor-pointer">
                Ajouter
              </button>
              <button
                onClick={() => setShowCatItemForm(!showCatItemForm)}
                className="flex-1 bg-gray-300 rounded-lg py-2 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <CategoryItemList
          selectedCategory={selectedCategory}
        />
      </section>
    </div>
  );
};
