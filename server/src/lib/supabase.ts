import { createClient } from "@supabase/supabase-js";
import {config} from 'dotenv'

config();

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // backend uniquement
);


export const getUser = async (token :string) =>{
    return await supabase.auth.getUser(token);
}