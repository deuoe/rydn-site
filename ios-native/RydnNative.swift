//
//  RydnNative.swift
//  RYDN — JS ↔ native bridge for iOS-only features
//
//  All JS calls coming through the "rydnNative" message handler are
//  dispatched here. Each native feature gets its own private function
//  so this file stays easy to extend.
//
//  JS calls look like:
//      window.webkit.messageHandlers.rydnNative.postMessage({
//          action: "haptic",
//          style: "medium"
//      })
//
//  To add a new feature:
//    1. Add a `case "yourAction":` below.
//    2. Add a private handler that reads its params from `body`.
//    3. Mirror it with a typed helper in `src/lib/rydnNative.ts`.
//

import UIKit
import WebKit

extension ViewController {

    /// Entry point for every message sent on the "rydnNative" channel.
    /// Dispatches to the correct feature handler based on `action`.
    func handleRydnNative(message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let action = body["action"] as? String else {
            print("[rydnNative] invalid message body: \(message.body)")
            return
        }

        switch action {
        case "haptic":
            handleHaptic(body: body)

        // Future native features will be added here:
        // case "share":               handleShare(body: body)
        // case "addToCalendar":        handleAddToCalendar(body: body)
        // case "scheduleNotification": handleScheduleNotification(body: body)

        default:
            print("[rydnNative] unknown action '\(action)'")
        }
    }

    // ============================================================
    // Haptic feedback
    // ============================================================
    //
    // Wraps Apple's three haptic generators:
    //   - UIImpactFeedbackGenerator   — physical "tap" haptics
    //   - UINotificationFeedbackGenerator — confirmation triple-haptics
    //   - UISelectionFeedbackGenerator — subtle "tick" for value changes
    //
    // Older devices (e.g., iPhone 7 and below) may not support all styles;
    // the OS gracefully degrades to silence in that case, no crash.

    private func handleHaptic(body: [String: Any]) {
        let style = (body["style"] as? String) ?? "light"

        // Apple recommends triggering on the main thread.
        DispatchQueue.main.async {
            switch style {
            case "light":
                let g = UIImpactFeedbackGenerator(style: .light)
                g.prepare()
                g.impactOccurred()

            case "medium":
                let g = UIImpactFeedbackGenerator(style: .medium)
                g.prepare()
                g.impactOccurred()

            case "heavy":
                let g = UIImpactFeedbackGenerator(style: .heavy)
                g.prepare()
                g.impactOccurred()

            case "success":
                let g = UINotificationFeedbackGenerator()
                g.prepare()
                g.notificationOccurred(.success)

            case "warning":
                let g = UINotificationFeedbackGenerator()
                g.prepare()
                g.notificationOccurred(.warning)

            case "error":
                let g = UINotificationFeedbackGenerator()
                g.prepare()
                g.notificationOccurred(.error)

            case "selection":
                let g = UISelectionFeedbackGenerator()
                g.prepare()
                g.selectionChanged()

            default:
                // Unknown style: fall back to a quiet light tap rather than
                // failing silently, so the JS caller still gets feedback.
                let g = UIImpactFeedbackGenerator(style: .light)
                g.prepare()
                g.impactOccurred()
            }
        }
    }
}
