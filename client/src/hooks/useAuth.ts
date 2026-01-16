import { useContext } from 'react'
import { AuthContext } from '../app/AuthContext.tsx'

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        console.log('Ici')
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
