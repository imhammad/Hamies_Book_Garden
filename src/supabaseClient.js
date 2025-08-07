import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qfljhjpwaxzposrvbewl.supabase.co'; // replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbGpoanB3YXh6cG9zcnZiZXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NjczNjQsImV4cCI6MjA3MDE0MzM2NH0.8tQlotCtwtZZVPJo9wMasT8Ul7RucPdUzODl4-QHtB4'; // replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
