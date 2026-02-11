import { useEffect, useState } from 'react'
import { getUserStat } from '../api'
import type { PostgrestError } from '@supabase/supabase-js'
import { useAuth } from './useAuth'

export const useDashBoardStats = () => {
    const [stats, setStats] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<PostgrestError | null>(null)
    const { session } = useAuth()
    useEffect(() => {
        const fetchStats = async () => {
            const { data, error } = await getUserStat(
                session?.user.id as string
            )

            if (error) {
                setError(error)
            } else {
                setStats(data ?? [])
            }

            setLoading(false)
        }

        fetchStats()
    }, [])

    return { stats, loading, error }
}
