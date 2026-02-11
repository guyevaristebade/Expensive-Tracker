/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from '../lib'

export const selectRequest = async (table: string) => {
    return await supabase.from(table).select()
}

export const deleteRequest = async (table: string, id: string | string[]) => {
    return await supabase.from(table).delete().eq('id', id)
}

export const deleteMany = async (table: string, ids:string[]) => {
    return await supabase.from(table).delete().in('id', ids)
}


export const updateRequest = async (table: string, data : any, id: string ) => {
    return await supabase.from(table).update(data).eq('id',id);
}
