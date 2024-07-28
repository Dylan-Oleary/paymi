declare module NodeJS {
  interface ProcessEnv {
    // Supabase
    SUPABASE_CLIENT_API_KEY: string;
    SUPABASE_URL: string;
  }
}
