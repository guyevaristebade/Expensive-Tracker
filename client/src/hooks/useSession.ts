import { useEffect, useState } from 'react'

import type { Session } from '@supabase/supabase-js'
import { getUserSession } from '../features/auth'
import { supabase } from '../lib'

export const useSession = () => {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        getUserSession().then(({ data }) => {
            setSession(data.session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return session
}
