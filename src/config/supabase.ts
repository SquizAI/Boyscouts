import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxgdnwtxhrhvojblvgvh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Z2Rud3R4aHJodm9qYmx2Z3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODI2MzIsImV4cCI6MjA0ODg1ODYzMn0.HXHo86EDiij2czdd3jBkIirLTGVRGzTeYyl4xguoGmM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);