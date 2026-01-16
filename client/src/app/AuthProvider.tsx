import { AuthContext } from './AuthContext'
import {
    signIn as signInApi,
    signUp as signUpApi,
    signOut as signOutApi,
    getUserSession,
} from '../features/auth'
import { supabase } from '../lib'

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

type AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const signIn = async (email: string, password: string) => {
        return await signInApi(email, password)
    }

    const signUp = async (
        email: string,
        password: string,
        displayName: string
    ) => {
        return await signUpApi(email, password, displayName)
    }

    const signOut = async () => {
        await signOutApi()
        setSession(null)
    }

    useEffect(() => {
        // Session initiale (refresh auto inclus)
        getUserSession().then(({ data }) => {
            setSession(data.session)
            setLoading(false)
        })

        // Sync temps réel
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                loading,
                session,
                isAuthenticated: !!session,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
