import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Auto-register the service worker in the app — no extra code needed
      registerType: "autoUpdate",
      injectRegister: "auto",
      // Don't generate site.webmanifest because we already have a public/site.webmanifest
      // pointing at all the right icons. Tell the plugin to use ours.
      manifestFilename: "site.webmanifest",
      manifest: {
        name: "RooZ Youth Development Network",
        short_name: "RYDN",
        description:
          "Free 1-on-1 advising sessions with university students who are 2-3 years ahead of you. Workshops, mentorship, and academic guidance from a Canadian nonprofit.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#0ea5e9",
        background_color: "#0f172a",
        lang: "en",
        dir: "ltr",
        categories: ["education", "lifestyle", "social"],
        iarc_rating_id: "",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        shortcuts: [
          {
            name: "Book an Advisor",
            short_name: "Book",
            description: "Browse advisors and book a free session",
            url: "/#advisors",
            icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Workshops",
            short_name: "Workshops",
            description: "View upcoming RYDN workshops",
            url: "/workshops",
            icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Support RYDN",
            short_name: "Support",
            description: "Donate or partner with RYDN",
            url: "/donation",
            icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "RYDN home — free 1-on-1 advising",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "narrow",
            label: "RYDN home — free 1-on-1 advising",
          },
        ],
        prefer_related_applications: false,
        related_applications: [],
        edge_side_panel: {
          preferred_width: 480,
        },
        launch_handler: {
          client_mode: "auto",
        },
        handle_links: "preferred",
      },
      // Workbox config — pre-caches the built assets + handles runtime caching
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2,ico,webmanifest}"],
        // Make sure SPA routes always work offline by serving index.html
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/_/],
        // Don't precache files larger than 5 MB (the home hero is the biggest at ~429 KB, so we're fine)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // Cache Google Fonts CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            // Cache Google Fonts font files (longer cache)
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      // Show the prompt in dev so we can verify it works
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
