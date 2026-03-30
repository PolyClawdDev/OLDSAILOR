/**
 * Offisiell timebestilling for hele nettsiden.
 * Sett VITE_BOOKING_URL i .env (Fresha, Booksy, egen booking-side, osv.).
 * Uten env åpnes WhatsApp til salongen som standard.
 */
const fromEnv = (import.meta.env.VITE_BOOKING_URL as string | undefined)?.trim();

export const OFFICIAL_BOOKING_HREF =
  fromEnv ||
  `https://wa.me/4746229750?text=${encodeURIComponent(
    'Hei! Jeg vil gjerne bestille time hos Old Sailor Barbershop.'
  )}`;
