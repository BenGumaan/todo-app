/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    // Add more environment variables here...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }