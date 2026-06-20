/**
 * Bridge to native iOS features when RYDN is running inside the iOS app
 * (PWABuilder Swift shell).
 *
 * Design rules
 * - **Graceful no-op on the web.** Every helper checks for the WebKit
 *   message handler before calling it. On Chrome/Firefox/Android the
 *   functions return immediately without errors, so the same component
 *   code runs everywhere.
 * - **Single message handler name** (`rydnNative`) with an `action` field,
 *   so we don't have to register a new handler in Swift every time we
 *   add a feature.
 * - **Stay strongly typed.** Each action has a typed exported helper so
 *   callers can't pass the wrong parameters.
 *
 * Adding a new native action
 *   1. Add a new helper here that calls `postNative({ action, ... })`.
 *   2. Add a matching `case` to `handleRydnNative` in `RydnNative.swift`.
 */

// PWABuilder injects message handlers under window.webkit.messageHandlers.
// The handler is only present when the app is running inside our iOS shell.
type NativeMessage = Record<string, unknown> & { action: string }

interface RydnMessageHandler {
  postMessage: (msg: NativeMessage) => void
}

interface RydnWebKit {
  messageHandlers?: { rydnNative?: RydnMessageHandler }
}

function getHandler(): RydnMessageHandler | undefined {
  if (typeof window === "undefined") return undefined
  const wk = (window as unknown as { webkit?: RydnWebKit }).webkit
  return wk?.messageHandlers?.rydnNative
}

function postNative(msg: NativeMessage): void {
  const handler = getHandler()
  if (!handler) return
  try {
    handler.postMessage(msg)
  } catch (err) {
    // Don't let bridge failures crash the UI.
    console.warn("[rydnNative] postMessage failed:", err)
  }
}

/** True when running inside the RYDN iOS app shell (not Safari, not Chrome). */
export const isNativeIOS = (): boolean => Boolean(getHandler())

// ============================================================
// Haptic feedback
// ============================================================

/**
 * Available haptic styles map to Apple's standard generators:
 * - `light` / `medium` / `heavy`: physical "tap" feedback for UI elements
 * - `success` / `warning` / `error`: notification-style triple feedback
 * - `selection`: subtle tick used when changing a value (e.g., picker)
 */
export type HapticStyle =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error"
  | "selection"

/**
 * Trigger a native haptic. Silently no-ops on the web and on iPhones that
 * don't support the requested style.
 *
 * Examples
 *   haptic()              // default light tap
 *   haptic("success")     // booking confirmed
 *   haptic("selection")   // user changed language
 */
export function haptic(style: HapticStyle = "light"): void {
  postNative({ action: "haptic", style })
}
