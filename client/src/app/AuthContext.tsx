import { createContext } from 'react'
import type {
    AuthResponse,
    AuthTokenResponsePassword,
    Session,
} from '@supabase/supabase-js'

type AuthContextType = {
    session: Session | null
    isAuthenticated: boolean
    loading: boolean
    signIn: (
        email: string,
        password: string
    ) => Promise<AuthTokenResponsePassword>
    signUp: (
        email: string,
        password: string,
        displayName: string
    ) => Promise<AuthResponse>
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
