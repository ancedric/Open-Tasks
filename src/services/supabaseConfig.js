
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oslfczfntoczjjceenhh.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zbGZjemZudG9jempqY2VlbmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MTIzNjIsImV4cCI6MjA0NTA4ODM2Mn0.jxOpBcOXL1o4Qm098stJI0ecmVLlq0x12HgW2pFQhbQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase