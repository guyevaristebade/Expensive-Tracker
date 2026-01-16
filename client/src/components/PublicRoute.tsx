import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'


export const PublicRoute = () => {
    const { session } = useAuth()

    if (!session) return <Navigate to="/auth" replace />

    return <Outlet/>
}
