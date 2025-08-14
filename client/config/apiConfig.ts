// ✅ Values are replaced at build time by Next.js
export const API_URL: string =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL_DEV ||
  '';
