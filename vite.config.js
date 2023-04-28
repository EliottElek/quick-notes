import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_SUPABASE_URL: "https://hqgzddojabxfzifsaavu.supabase.co",
      REACT_APP_SUPABASE_ANON_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ3pkZG9qYWJ4ZnppZnNhYXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3MDAzMTUsImV4cCI6MTk4NDI3NjMxNX0._LMj5aD_CPKzanW8tdLY2JfGe887PR_xF0TdYfVvLSQ",
      REACT_APP_SITE_URL: "http://localhost:3000/",
    },
  },
});
