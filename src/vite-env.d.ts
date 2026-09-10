/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Set to `off` to skip the branded LoadingScreen entirely at build time.
   * Used to A/B its cost in Lighthouse without touching code — see .env.example.
   */
  readonly VITE_LOADING_SCREEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
