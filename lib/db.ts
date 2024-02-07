import { createClient } from "@supabase/supabase-js";

const url = process.env.DATABASE_URL;
const anon = process.env.DATABASE_ANON;

export const db = createClient(String(url), String(anon));
