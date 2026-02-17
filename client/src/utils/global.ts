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

export const parseDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toUTCString()
}

/**
 * Formate un timestamp en format français : "12 janv. 2024"
 * @param timestamp - String représentant un timestamp (ISO 8601 ou autre format de date)
 * @returns String formatée au format "DD MMM. YYYY"
 */
export const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp)

    // Vérification que la date est valide
    if (isNaN(date.getTime())) {
        return ''
    }

    const day = date.getDate()
    const monthNames = [
        'janv.',
        'févr.',
        'mars',
        'avr.',
        'mai',
        'juin',
        'juil.',
        'août',
        'sept.',
        'oct.',
        'nov.',
        'déc.',
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}
