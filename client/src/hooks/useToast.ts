import { useContext } from 'react'

import { ToastContext } from '../app/ToastContext.tsx'

export const useToast = () => {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('useToast must be used within an ToastProvider')
    }

    return context
}
