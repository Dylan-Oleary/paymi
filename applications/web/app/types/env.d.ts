declare module NodeJS {
  interface ProcessEnv {
    // Supabase
    SUPABASE_ANON_KEY: string;
    SUPABASE_URL: string;
  }
}
