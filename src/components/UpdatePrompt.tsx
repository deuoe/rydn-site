/**
 * UpdatePrompt
 *
 * Watches for new versions of the service worker. When a new one is detected
 * (i.e., we deployed an update and the user is on an older cached version),
 * shows a small toast in the bottom-right corner inviting them to reload.
 *
 * Pair this with `skipWaiting: true` + `clientsClaim: true` in vite.config so
 * a) the new SW takes over immediately on activation, and b) on the next
 * route navigation everything is fresh even if the user dismisses the toast.
 *
 * Why this exists: PWAs aggressively cache assets for offline support, which
 * means without an explicit update path users can stay stuck on an old
 * deployment for *days* — they never close the tab/installed app long enough
 * for the SW to activate the new version naturally.
 */
import { useState } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"
import { RefreshCw, X } from "lucide-react"

export default function UpdatePrompt() {
  // hidden = user dismissed this banner explicitly; don't keep nagging them
  const [hidden, setHidden] = useState(false)

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Check for a new service worker every hour in case the user keeps the
    // PWA open all day. Without this we'd only check on page load.
    onRegisteredSW(_swUrl, r) {
      if (!r) return
      setInterval(
        () => {
          // Best-effort re-fetch of the SW. Workbox will swap it in if it's new.
          r.update().catch(() => {})
        },
        60 * 60 * 1000, // 1 hour
      )
    },
  })

  // Nothing new, or user dismissed it — render nothing.
  if (!needRefresh || hidden) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 dark:ring-white/10"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
          <RefreshCw size={18} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            New version available
          </p>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
            Reload to get the latest RYDN updates.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => updateServiceWorker(true)}
              className="rounded-full bg-sky-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => {
                setNeedRefresh(false)
                setHidden(true)
              }}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Later
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setNeedRefresh(false)
            setHidden(true)
          }}
          className="ml-1 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
