import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ovyaciawbpuvhxkjcvga.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWFjaWF3YnB1dmh4a2pjdmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDc1MjgsImV4cCI6MjA2NDAyMzUyOH0.OuGxNJD84ZpADhhY2ePFa7i-LFY3M4MoJWACzYq11Io";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;