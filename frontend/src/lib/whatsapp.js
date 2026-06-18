export const WHATSAPP_NUMBER = "919399608793";

export function buildWhatsAppUrl(text = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const trimmed = text?.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

export function openWhatsApp(text = "") {
  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
}
