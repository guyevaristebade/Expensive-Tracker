import type { LucideIcon } from 'lucide-react'
import type { Room } from './dashboard'

export type ModeType = 'create' | 'edit'

export type RoomStatsCardProps = {
    icon: LucideIcon
    title: string
    value: number
    color?: string
    border?: string
    bg?: string
}

export type FormDataType = {
    name: string
    description: string
    color: string
}

export type RoomType = {
    id?: string
    name: string
    description: string
    color: string
    amount?: string
}

export type RoomModalProps = {
    mode: 'create' | 'edit'
    onClose: () => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    formData: FormDataType
    errors: CreateRoomError
    isSubmitting: boolean
}

export type ApercuProps = {
    color: string
    name: string
    description: string
}

export type RoomCardProps = {
    room: Room
    checked?: boolean
    onDelete?: () => void
    onEdit?: () => void
    onChecked?: () => void
}

export type CreateRoomError = FormDataType

export type RoomStats = {
    total_items: number
    total_price_items: number
    total_rooms: number
}

export type FilterType = 'all' | 'most-recent' | 'most-expensive' | 'least-expensive' | 'most-articles'
