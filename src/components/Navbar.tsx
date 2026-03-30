import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BRAND_LOGO_SRC } from '../branding';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

const navLinks = [
  { label: 'Hjem', href: '#hjem' },
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Om Oss', href: '#om-oss' },
  { label: 'Galleri', href: '#galleri' },
  { label: 'Anmeldelser', href: '#anmeldelser' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection] = useState('hjem');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#070c16]/62 backdrop-blur-2xl border-b border-[#c9a66b]/18 shadow-[0_10px_35px_rgba(0,0,0,0.45)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-[48px] sm:h-[64px] px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Logo */}
          <a href="#hjem" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="rounded-full p-[2px] shadow-[0_0_12px_rgba(201,166,107,0.22)]"
                style={{
                  background: 'linear-gradient(145deg, #e8c547, #c9a66b, #6b4a1e)',
                }}
              >
                <div className="rounded-full p-0.5 bg-[#0a0a0a] ring-1 ring-black/50">
                  <img
                    src={BRAND_LOGO_SRC}
                    alt="Old Sailor Barbershop"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover block group-hover:brightness-110 transition-all"
                  />
                </div>
              </div>
            </motion.div>
            <div className="hidden sm:block drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] leading-none">
              <span className="font-serif text-lg font-bold text-white tracking-wide">Old Sailor</span>
              <span className="text-[#c9a66b] ml-1 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light hidden sm:inline"> Barbershop</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wider font-medium transition-all duration-300 relative group drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#c9a66b]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a66b] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <motion.a
              href={OFFICIAL_BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex btn-brass items-center justify-center gap-2 px-5 sm:px-6 py-2.5 min-h-[44px] text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase font-bold rounded-sm touch-manipulation"
            >
              Book Nå
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Lukk meny' : 'Åpne meny'}
              className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center text-white/80 hover:text-[#c9a66b] transition-colors touch-manipulation -mr-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[48px] sm:top-[64px] left-0 right-0 z-[90] max-h-[min(70vh,calc(100dvh-3rem))] overflow-y-auto bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#c9a66b]/10 lg:hidden pb-[env(safe-area-inset-bottom,0px)]"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-[#c9a66b] py-3 text-base font-medium tracking-wide border-b border-white/5 transition-colors flex items-center gap-3"
                >
                  <span className="text-[#c9a66b]/40 text-xs font-mono">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                href={OFFICIAL_BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-brass mt-4 py-4 min-h-[52px] text-sm tracking-[0.15em] uppercase font-bold rounded-sm flex items-center justify-center gap-2 touch-manipulation"
              >
                Book Din Time
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
