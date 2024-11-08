import {createClient} from '@supabase/supabase-js'

import {type Database} from '@/supabase/database.types'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const client = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const createBrowserClient = () => client
