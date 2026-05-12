/**
 * Tiny event bus for opening the AI chat modal from anywhere in the app.
 * The <AIMatchmaker /> component (mounted once in Layout) listens for these.
 */
export type AIChatMode = "matchmaker" | "general"

export const OPEN_AI_CHAT_EVENT = "rydn:open-ai-chat"

/** Open the chat modal in the requested mode. */
export function openAIChat(mode: AIChatMode = "matchmaker") {
  window.dispatchEvent(new CustomEvent(OPEN_AI_CHAT_EVENT, { detail: { mode } }))
}
