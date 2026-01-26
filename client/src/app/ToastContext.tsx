// ToastContext.ts
import { createContext } from 'react'

export type ToastType = {
    id?: string
    title: string
    description: string
    variant?: 'success' | 'error' | 'info' | 'warning'
}

type ToastContextType = {
    addToast: (toast: ToastType) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined
)
