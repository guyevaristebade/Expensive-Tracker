import { supabase } from '../lib'

export const createRoom = async (dataSource: any) => {
    return await supabase.from('rooms').insert(dataSource)
}
