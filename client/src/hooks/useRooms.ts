import { useEffect, useState, useCallback } from 'react'
import { selectRequest } from '../api'
import type { PostgrestError } from '@supabase/supabase-js'
import type { FilterType, Room, RoomStats } from '../types'
import { supabase } from '../lib'


export const useRooms = (filter: FilterType = 'all') => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [roomStats, setRoomStats] = useState<RoomStats | null>(null)
    const [error, setError] = useState<PostgrestError | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchRooms = useCallback(async () => {
        let query = supabase.from('room_with_totals').select()

        // Appliquer les filtres dynamiquement
        switch (filter) {
            case 'most-recent':
                query = query.order('created_at', { ascending: false })
                break
            case 'most-expensive':
                query = query.order('total_price', { ascending: false })
                break
            case 'least-expensive':
                query = query.order('total_price', { ascending: true })
                break
            case 'most-articles':
                query = query.order('total_items', { ascending: false })
                break
            case 'all':
            default:
                query = query.order('created_at', { ascending: false })
                break
        }

        const { data, error } = await query

        if (error) {
            setError(error)
        } else {
            setRooms(data ?? [])
        }
    }, [filter])

    const fetchRoomStats = useCallback(async () => {
        const { data, error } = await selectRequest('dashboard_items_summary')
        if (!error && data?.length) {
            setRoomStats(data[0])
        }
    }, [])

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true)
            await Promise.all([fetchRooms(), fetchRoomStats()])
            setLoading(false)
        }
        fetchAll()
    }, [fetchRooms, fetchRoomStats])

    return {
        rooms,
        roomStats,
        loading,
        error,
        refetch: () => Promise.all([fetchRooms(), fetchRoomStats()]),
    }
}