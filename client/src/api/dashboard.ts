import { supabase } from '../lib'

export const getUserStat = async (userId: string) => {
    return await supabase.from('dashboard_items_summary').select()
    // .eq("owner_id", userId)
    // .single();
}
