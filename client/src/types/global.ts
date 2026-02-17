import type { LucideIcon } from 'lucide-react'

export type ResultProps = {
    title: string
    message: string
    icon?: LucideIcon
    action?: React.ReactNode
}

export type AuthModeType = 'login' | 'register'

export interface Profile {
    id: string
    email: string
    username: string
    currency: string
    created_at: string
    updated_at: string
}
