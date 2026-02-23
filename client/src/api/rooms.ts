import { supabase } from '../lib'
import type { Room } from '../types'

export const createRoom = async (
    data: Omit<Room, 'id' | 'created_at' | 'updated_at' | 'items'>
) => {
    return await supabase.from('rooms').insert(data)
}

export const getRoomById = async (id: string) => {
    return await supabase
        .from('rooms')
        .select(
            `
        *,
        items (*)
    `
        )
        .eq('id', id)
}

export const getRooms = async () => {
    return await supabase.from('rooms').select('*')
}

export const getRoomDetailStats = async (id: string) => {
    return await supabase.from('room_detail_stats').select().eq('room_id', id)
}
