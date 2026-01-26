import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { DollarSign } from 'lucide-react'

type ProtectedRouteType = {
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
    const { session, loading } = useAuth()

    // Optionnel : éviter le flicker au refresh
    if (loading) {
        return (
            <div className="animate-pulse flex justify-center items-center h-screen">
                <DollarSign
                    size={100}
                    className="text-gradient-to-br from-gray-900 via-green-900 to-gray-900 "
                />
            </div>
        )
    }

    if (!session) return <Navigate to="/auth" replace />

    return children
}
