import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tpcqtapnrwqgehmtsgsn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwY3F0YXBucndxZ2VobXRzZ3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODk4MDQsImV4cCI6MjA5NDA2NTgwNH0.eFbOHtgzCi1AFoXUcHwpqIeQK09xs4MrJKljOpyB6mw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Registration {
  id?: string;
  division: 'male' | 'female';
  team_name: string;
  team_abbr: string;
  captain_name: string;
  coach_name: string;
  coach_phone: string;
  team_email: string;
  player_count: string;
  players: string[];
  logo: string;
  team_group?: 'A' | 'B' | 'C' | null;
  registered_at?: string;
}

export interface Sponsor {
  id?: string;
  name: string;
  logo: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  created_at?: string;
}
