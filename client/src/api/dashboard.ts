import { supabase } from '../lib'

export const getUserStat = async () => {
    return await supabase.from('dashboard_items_summary').select()
}
