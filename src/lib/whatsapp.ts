export const WHATSAPP_NUMBER = "233257920107";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Design Labs! I'm interested in working with you on a project. I'd love to discuss my ideas and learn more about your services.";

/**
 * Builds an official WhatsApp Click-to-Chat URL (wa.me) with a pre-filled message.
 * Uses international Ghana format without '+', spaces, or dashes (233257920107).
 */
export function getWhatsAppUrl(topic?: string): string {
  const message = topic
    ? `Hi Design Labs! I'm interested in working with you on a project (${topic}). I'd love to discuss my ideas and learn more about your services.`
    : DEFAULT_WHATSAPP_MESSAGE;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens the Design Labs WhatsApp chat in a new tab, falling back to direct navigation.
 */
export function openWhatsAppChat(topic?: string): void {
  const url = getWhatsAppUrl(topic);
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.href = url;
  }
}
