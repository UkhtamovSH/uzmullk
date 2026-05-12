import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Content-Security-Policy — dev allows 'unsafe-inline' for Vite HMR.
// In production (nginx/Vercel/Cloudflare) replace with a nonce-based policy.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // tighten in prod with nonce
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' ws: wss:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
    // headers: {
    //   "Content-Security-Policy": CSP,
    //   "X-Content-Type-Options": "nosniff",
    //   "X-Frame-Options": "DENY",
    //   "X-XSS-Protection": "1; mode=block",
    //   "Referrer-Policy": "strict-origin-when-cross-origin",
    //   "Permissions-Policy":
    //     "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    // },
  },

  build: {
    // No source maps in production — avoids exposing original source code
    sourcemap: false,
    // Minify output to reduce attack surface readability
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Hashed filenames prevent caching of stale bundles
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
