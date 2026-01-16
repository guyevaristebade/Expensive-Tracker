import type {
    AuthResponse,
    AuthTokenResponsePassword,
    UserResponse,
} from '@supabase/supabase-js'
import { supabase } from '../../lib'

export const signIn = async (
    email: string,
    password: string
): Promise<AuthTokenResponsePassword> => {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    })
}

export const signUp = async (
    email: string,
    password: string,
    displayName: string
): Promise<AuthResponse> => {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName,
            },
        },
    })
}

export const signOut = async (): Promise<void> => {
    await supabase.auth.signOut()
}

export const getUser = async (): Promise<UserResponse> => {
    return await supabase.auth.getUser()
}

export const getUserSession = async () => {
    return await supabase.auth.getSession()
}
