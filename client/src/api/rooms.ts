import { supabase } from '../lib'
import type { FormDataType } from '../types'

export type CreateRoomInput = FormDataType & { owner_id?: string }

export const createRoom = async (data: CreateRoomInput) => {
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

export const getRoomDetailStats = async (id: string) => {
    return await supabase.from('room_detail_stats').select().eq('room_id', id)
}
