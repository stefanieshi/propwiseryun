import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://rqejjsbqsshdxljylwvn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZWpqc2Jxc3NoZHhsanlsd3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTQ0NzAsImV4cCI6MjAyNTIzMDQ3MH0.OYYDcPwGUUUDYqPpMDcwGQhqU7zVnPKLe3A3ql-eRbM'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)