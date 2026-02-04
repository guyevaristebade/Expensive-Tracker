import type { LucideIcon } from 'lucide-react'

export type ResultProps = {
    title: string
    message: string
    icon?: LucideIcon
    action?: React.ReactNode
}

export type AuthModeType = 'login' | 'register'
