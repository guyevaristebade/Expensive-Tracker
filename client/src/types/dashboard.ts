export interface Room {
    id: string
    name: string
    owner_id: string
    color: string
    description: string
    created_at: string
    updated_at: string
    total_price: number
    total_items: number
}

export interface Errors {
    name: string
    price: string
    purchaseDate: string
    description: string
    invoice: string
    photo: string
    roomId: string
}

export interface ExpenseFormData {
    name: string
    price?: string
    purchaseDate?: string
    description?: string
    roomId: string
}

export interface Files {
    invoice?: File | null
    photo?: File | null
}

export interface AddExpenseModalProps {
    errors: Errors
    onClose: () => void
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    rooms: Room[]
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    expenseFormData: ExpenseFormData
}

export interface ExpenseItem {
    id: number
    name: string
    amount: number
}

export interface Category {
    id: number
    name: string
    color: 'green' | 'orange' | 'indigo' | 'blue' | 'red'
    items: ExpenseItem[]
}

export interface CategoriesPanelProps {
    categories: Category[]
}

export interface CategoryList extends CategoriesPanelProps {
    selectedCategory: Category
    setSelectedCategory: (cat: Category) => void
    colorMap: Record<Category['color'], string>
}

export interface DashBoardTitleProps {
    title?: string
    subtitle?: string
    isDetailed?: boolean
    color?: string
    onClick?: () => void
}
