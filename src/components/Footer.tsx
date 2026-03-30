import { motion } from 'framer-motion';
import { Anchor, MapPin, Phone } from 'lucide-react';
import { BRAND_LOGO_SRC } from '../branding';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

export default function Footer() {
  return (
    <footer className="relative bg-[#040810] overflow-hidden">
      {/* Top wave divider */}
      <div className="relative h-16 overflow-hidden">
        <svg viewBox="0 0 1440 60" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
            fill="#040810" />
          <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30"
            stroke="rgba(201,166,107,0.15)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,166,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,107,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2rem))]">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6 flex justify-center"
          >
            <div className="relative flex justify-center">
              <motion.div
                className="absolute -inset-4 rounded-full border border-dashed border-[#c9a66b]/25 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <div
                className="relative rounded-full p-[3px]"
                style={{
                  background: 'linear-gradient(145deg, #e8c547, #c9a66b, #6b4a1e)',
                  boxShadow: '0 0 32px rgba(201,166,107,0.35)',
                }}
              >
                <div className="rounded-full p-1.5 bg-[#120e0b]">
                  <img
                    src={BRAND_LOGO_SRC}
                    alt="Old Sailor Barbershop"
                    className="w-20 h-20 rounded-full object-cover block"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-4">
            Klar til å seile inn?
          </h2>
          <p className="text-white/40 mb-8 text-sm max-w-md mx-auto">
            Book din time og opplev Oslos mest unike barbershop-opplevelse.
          </p>
          <motion.a
            href={OFFICIAL_BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-brass inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-sm"
          >
            <Anchor className="w-4 h-4" />
            Book Din Time
          </motion.a>
        </motion.div>

        {/* Horizontal divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a66b]/20 to-transparent mb-16" />

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="rounded-full p-[2px] flex-shrink-0"
                style={{ background: 'linear-gradient(145deg, #e8c547, #c9a66b, #6b4a1e)' }}
              >
                <div className="rounded-full p-0.5 bg-[#0a0a0a]">
                  <img
                    src={BRAND_LOGO_SRC}
                    alt="Old Sailor Barbershop logo"
                    className="w-10 h-10 rounded-full object-cover block"
                  />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white">Old Sailor</span>
                <span className="text-[#c9a66b]/60 text-xs ml-1.5 tracking-widest uppercase">Barbershop</span>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              Oslos eneste maritime barbershop siden 2016. Et sted der sjømannskultur møter 
              moderne barberhåndverk.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['Siden 2016', 'Maritim stil', '4.9★'].map(badge => (
                <span key={badge} className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 border border-[#c9a66b]/15 text-[#c9a66b]/50">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs font-mono tracking-[0.3em] uppercase mb-6">Kontakt</h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=Thereses+gate+18+Oslo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-4 h-4 text-[#c9a66b]/40 group-hover:text-[#c9a66b] transition-colors mt-0.5 flex-shrink-0" />
                <span className="text-white/45 text-sm group-hover:text-white/70 transition-colors">
                  Thereses gate 18<br />0358 Oslo, Norge
                </span>
              </a>
              <a
                href="tel:46229750"
                className="flex items-center gap-3 group"
              >
                <Phone className="w-4 h-4 text-[#c9a66b]/40 group-hover:text-[#c9a66b] transition-colors flex-shrink-0" />
                <span className="text-white/45 text-sm group-hover:text-white/70 transition-colors">
                  462 29 750
                </span>
              </a>
              <a
                href="https://instagram.com/oldsailorbarbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <svg className="w-4 h-4 text-[#c9a66b]/40 group-hover:text-[#c9a66b] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-white/45 text-sm group-hover:text-white/70 transition-colors">
                  @oldsailorbarbershop
                </span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white/60 text-xs font-mono tracking-[0.3em] uppercase mb-6">Åpningstider</h4>
            <div className="space-y-2.5">
              {[
                { day: 'Mandag – Fredag', time: '10:00 – 20:00' },
                { day: 'Lørdag', time: '10:00 – 18:00' },
                { day: 'Søndag', time: '11:00 – 17:00' },
              ].map(item => (
                <div key={item.day} className="flex items-center justify-between gap-4">
                  <span className="text-white/35 text-sm">{item.day}</span>
                  <span className="text-[#c9a66b]/60 text-sm font-mono">{item.time}</span>
                </div>
              ))}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0a5c5c] animate-pulse" />
                <span className="text-[#0a5c5c] text-xs font-mono">Åpent nå</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/20 text-xs">
              <span>© 2024 Old Sailor Barbershop</span>
              <span>·</span>
              <span>Alle rettigheter forbeholdt</span>
            </div>

            {/* Compass decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="opacity-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#c9a66b" strokeWidth="1" />
                <polygon points="12,3 14,12 12,10 10,12" fill="#c9a66b" />
                <polygon points="12,21 10,12 12,14 14,12" fill="#c9a66b" opacity="0.4" />
                <circle cx="12" cy="12" r="2" fill="#c9a66b" />
              </svg>
            </motion.div>

            <div className="text-white/15 text-xs">
              Laget med ❤ i Oslo
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
