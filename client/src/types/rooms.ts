import type { LucideIcon } from 'lucide-react'

export type ModeType = 'create' | 'edit'

export type RoomStatsCardProps = {
    icon: LucideIcon
    title: string
    value: string
    color?: string
    border?: string
    bg?: string
}

export type FormDataType = {
    id?: string
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
}

export type ApercuProps = {
    color: string
    name: string
    description: string
}

export type RoomCardProps = {
    // name: string
    // description?: string
    // amount: string
    // color?: string
    room: RoomType
    totalItems?: number
    updatedAt?: string
    checked?: boolean
    onDelete?: () => void
    onEdit?: () => void
    onChecked?: () => void
}
