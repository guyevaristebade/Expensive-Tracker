import { BarChart, DollarSign, Folder, LineChart } from 'lucide-react'
import type { Category } from '../types'

export const StatsData = [
    {
        description: 'Total Dépensé',
        value: '€250',
        icon: DollarSign,
        color: 'bg-green-100 text-green-400',
        border: 'border border-green-200',
    },
    {
        description: 'Catégories',
        value: '3',
        icon: Folder,
        color: 'bg-yellow-100 text-yellow-400',
        border: 'border border-yellow-200',
    },
    {
        description: 'Dépenses',
        value: '5',
        icon: BarChart,
        color: 'bg-blue-100 text-blue-400',
        border: 'border border-blue-200',
    },
    {
        description: 'Moyenne',
        value: '€50',
        icon: LineChart,
        color: 'bg-pink-100 text-pink-400',
        border: 'border border-pink-200',
    },
]

export const categories: Category[] = [
    {
        id: 1,
        name: 'Loisirs',
        color: 'green',
        items: [
            { id: 1, name: 'Cinéma', amount: 15 },
            { id: 2, name: 'Gaming', amount: 60 },
        ],
    },
    {
        id: 2,
        name: 'Alimentation',
        color: 'orange',
        items: [],
    },
    {
        id: 3,
        name: 'Transports',
        color: 'indigo',
        items: [],
    },
]
