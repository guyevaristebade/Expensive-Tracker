import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import type React from 'react'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { session } = useAuth()

    if (!session) return <Navigate to="/auth" replace />

    return { children }
}
