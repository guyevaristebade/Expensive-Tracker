import { queryClient } from './../lib/queryClient';
import { useEffect, useState, useCallback, use } from 'react'
import {
    createRoom,
    getRoomById,
    getRoomDetailStats,
    selectRequest,
} from '../api'
import type { PostgrestError } from '@supabase/supabase-js'
import { type RoomDetailStats, type Room, type RoomStats } from '../types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// export const useRooms = (filter: FilterType = 'all') => {
export const useRooms = () => {
    const queryClient = useQueryClient();
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

    const postRoom = useMutation({
        mutationFn: createRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms'],
            })
        },
    })

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
        postRoom,
        refetch: () => Promise.all([fetchRooms(), fetchRoomStats()]),
    }
}
