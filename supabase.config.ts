const devConfig = {
    SUPABASE_URL: 'https://ppfgwxkwqakubqcquzpk.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZmd3eGt3cWFrdWJxY3F1enBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxODA1NzksImV4cCI6MjA0Mzc1NjU3OX0.7VM_a0rjmGDj7_XecFmmuG5cgkOioFAh3R16YSOfeCo',
  };
  
  const prodConfig = {
    SUPABASE_URL: 'https://prod-supabase-url',
    SUPABASE_ANON_KEY: 'prod-anon-key',
  };
  
  const config = __DEV__ ? devConfig : prodConfig;
  
  export default config;