import { X } from 'lucide-react';
import { Button } from '../ui/Button';


export interface Room {
    id: string;
    name: string;
}

export interface Errors{
    name: string;
    price: string;
    purchaseDate: string;
    description: string;
    invoice: string;
    photo: string;
    roomId: string;
}
  
  export interface ExpenseFormData {
    name: string;
    price?: number;
    purchaseDate?: string;
    description?: string;
    invoice?: File | null;
    photo?: File | null;
    roomId: string;
  }
  

interface AddExpenseModalProps {
    errors: Errors,
    onClose : () => void
    rooms: Room[];
    onSubmit: (e : React.FormEvent<HTMLFormElement>) => void;
}

export const AddExpenseModal = ({
    errors,
    onClose,
    rooms,
    onSubmit,
}: AddExpenseModalProps) => {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Nouvelle dépense</h2>
          <Button variant='outline' onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className='flex flex-col gap-2'>
                <input
                    type="text"
                    placeholder="Nom"
                    name='nom'
                    className="w-full rounded-lg border px-4 py-2"
                />
                {errors.name && <span className='text-red-500 bg-red-200 p-2 rounded-md '>{errors.name}</span>}
            </div>

            <div className='flex flex-col gap-2'>
                <input
                    type="number"
                    placeholder="Prix"
                    name='price'
                    className="w-full rounded-lg border px-4 py-2"
                    />
                    {errors.price && <span className='text-red-500 bg-red-200 p-2 rounded-md '>{errors.price}</span>}
            </div>

            <input
                type="date"
                name='date'
                className="w-full rounded-lg border px-4 py-2"
            />

            <textarea
                placeholder="Description"
                name='description'
                className="w-full rounded-lg border px-4 py-2"
            />

            <select
                name='roomId'
                className="w-full rounded-lg border px-4 py-2"
            >
                <option value="">Sélectionner une pièce</option>
                {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                    {room.name}
                </option>
                ))}
            </select>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="file"
                    name='invoice'
                    className="w-full"
                />
                <input
                    type="file"
                    name='image'
                    className="w-full"
                />
            </div>
        </form>

            {/* Footer */}
            <div className="flex gap-4">
                <Button
                    className="flex-1 rounded-lg bg-green-600 py-2 text-white"
                >
                    Ajouter
                </Button>
                <button
                    onClick={onClose}
                    className="flex-1 rounded-lg bg-gray-300 py-2"
                >
                    Annuler
                </button>
                </div>
            </div>
        </div>
    );
};
