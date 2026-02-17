import { useEffect, useState, useCallback } from 'react'
import { getRoomById, getRoomDetailStats, selectRequest } from '../api'
import type { PostgrestError } from '@supabase/supabase-js'
import { type RoomDetailStats, type Room, type RoomStats } from '../types'

// export const useRooms = (filter: FilterType = 'all') => {
export const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [room, setRoom] = useState<Room | null>(null)
    const [roomDetatilStat, setRoomDetatilStat] = useState<RoomDetailStats>()
    const [roomStats, setRoomStats] = useState<RoomStats | null>(null)
    const [error, setError] = useState<PostgrestError | null>(null)
    const [loading, setLoading] = useState(true)

    
    const fetchRooms = useCallback(async () => {
        const { data, error } = await selectRequest('room_with_totals')
        if (error) {
            setError(error)
        } else {
            setRooms(data ?? [])
        }
    }, [])

    const fetchRoom = useCallback(async (id: string) => {
        setLoading(true)
        const { data, error } = await getRoomById('rooms', id)
        if (error) {
            setError(error)
            setRoom(null)
        } else {
            setRoom(data?.[0] ?? null)
        }
        setLoading(false)
    }, [])

    const fetchRoomDetailStats = useCallback(async (id: string) => {
        setLoading(true)
        const { data, error } = await getRoomDetailStats(id)
        if (error) {
            setError(error)
            setRoomDetatilStat(null)
        } else {
            setRoomDetatilStat(data?.[0] ?? null)
        }
        setLoading(false)
    }, [])

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
        room,
        fetchRoom,
        fetchRoomDetailStats,
        roomDetatilStat,
        refetch: () => Promise.all([fetchRooms(), fetchRoomStats()]),
    }
}
