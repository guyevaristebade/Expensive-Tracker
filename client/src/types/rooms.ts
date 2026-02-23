import type { LucideIcon } from 'lucide-react'
import type { RoomItem } from './items'

export type FilterType =
    | 'all'
    | 'most-recent'
    | 'most-expensive'
    | 'least-expensive'
    | 'most-articles'

export type ModeType = 'create' | 'edit'

export type RoomStatsCardProps = {
    icon: LucideIcon
    title: string
    value: number
    color?: string
    border?: string
    bg?: string
}

export interface FormDataType {
    name: string
    description: string
    color: string
}

export interface Room {
    id: string
    name: string
    description: string
    color: string
    created_at: string
    updated_at: string
    items?: RoomItem[]
}

export interface RoomModalProps {
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

export interface RoomStats {
    total_items: number
    total_price_items: number
    total_rooms: number
}

export interface Room {
    id: string
    name: string
    owner_id?: string
    color: string
    description: string
    created_at: string
    updated_at: string
    total_price?: number
    total_items?: number
    items?: RoomItem[]
}

export interface RoomDetailStats {
    room_id: string
    total_price: number
    total_items: number
    avg_price: string
    most_expensive_item_name: string
    most_expensive_item_price: number
    least_expensive_item_name: string
    least_expensive_item_price: number
}

export type Variant = 'purple' | 'green' | 'blue' | 'yellow' | 'pink'
export interface RoomCardDetailProps {
    label?: string
    amount: number
    currency?: string
    variant?: Variant
    description?: string
}
