import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import type React from 'react'

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { session } = useAuth()

    if (session) return <Navigate to="/dashboard" replace />

    return <>{children}</>
}
