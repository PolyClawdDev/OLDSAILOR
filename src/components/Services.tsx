import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { serviceCategories } from '../data/content';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';

// Premium SVG icons — no emojis
const ServiceIcons = {
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  razor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="8" width="20" height="8" rx="1"/>
      <line x1="6" y1="8" x2="6" y2="16"/><line x1="10" y1="8" x2="10" y2="16"/>
      <path d="M14 8 L22 8"/><circle cx="18" cy="12" r="2"/>
    </svg>
  ),
  beard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2C8 2 5 5 5 9v2c0 2 .5 4 2 5.5L9 18c1 1 2 2 3 2s2-1 3-2l2-1.5C18.5 15 19 13 19 11V9c0-4-3-7-7-7z"/>
      <path d="M9 18v2a3 3 0 006 0v-2"/>
    </svg>
  ),
  combo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  shave: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l-3 9m3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
    </svg>
  ),
  color: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"/>
      <path d="M14.5 21.5c0-1.5-2.5-4-2.5-4s-2.5 2.5-2.5 4a2.5 2.5 0 005 0z"/>
    </svg>
  ),
  oil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2v6M8 8h8M6 8l1 10a2 2 0 002 2h6a2 2 0 002-2L18 8"/>
      <path d="M9 12h6M9 16h6"/>
    </svg>
  ),
  towel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 4h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4V4z"/>
      <path d="M8 10v10M16 10v10M4 20h16"/>
      <path d="M9 14h6"/>
    </svg>
  ),
  head: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="9" r="6"/>
      <path d="M12 15v7M9 19h6"/>
      <path d="M9 9h.01M15 9h.01"/>
      <path d="M9 12s1 1.5 3 1.5 3-1.5 3-1.5"/>
    </svg>
  ),
};

const iconMap: Record<number, ReactNode> = {
  1: ServiceIcons.scissors,
  2: ServiceIcons.scissors,
  3: ServiceIcons.color,
  4: ServiceIcons.beard,
  5: ServiceIcons.razor,
  6: ServiceIcons.head,
  7: ServiceIcons.combo,
  8: ServiceIcons.oil,
  9: ServiceIcons.towel,
};

type Service = {
  id: number;
  title: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  details: string;
  featured: boolean;
};

function ServiceRow({
  service,
  index,
  isActive,
  onSelect,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onSelect: (s: Service) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onSelect(service)}
      className={`group relative flex items-center gap-3 sm:gap-6 py-5 sm:py-6 px-4 sm:px-6 min-h-[4.5rem] cursor-pointer transition-all duration-300 touch-manipulation ${
        isActive
          ? 'bg-gradient-to-r from-[#c9a66b]/8 via-[#c9a66b]/5 to-transparent'
          : 'hover:bg-white/[0.025]'
      }`}
    >
      {/* Left brass accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: 'linear-gradient(to bottom, transparent, #c9a66b, transparent)',
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Index number */}
      <div className="flex-shrink-0 w-8 text-right">
        <span className={`font-mono text-xs transition-colors duration-300 ${
          isActive ? 'text-[#c9a66b]' : 'text-white/20 group-hover:text-white/35'
        }`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Icon */}
      <div className={`flex-shrink-0 w-9 h-9 p-2 rounded-sm border transition-all duration-300 ${
        isActive
          ? 'border-[#c9a66b]/50 text-[#c9a66b] bg-[#c9a66b]/8'
          : 'border-white/8 text-white/25 group-hover:border-white/20 group-hover:text-white/45'
      }`}>
        {iconMap[service.id]}
      </div>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-0.5">
          <h3 className={`font-serif text-base font-medium transition-colors duration-300 ${
            isActive ? 'text-[#e0c28a]' : 'text-white/85 group-hover:text-white'
          }`}>
            {service.title}
          </h3>
          {service.featured && (
            <span className="flex-shrink-0 text-[9px] font-mono tracking-[0.25em] uppercase text-[#c9a66b] border border-[#c9a66b]/30 px-2 py-0.5">
              Populær
            </span>
          )}
        </div>
        <p className={`text-xs leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-1 ${
          isActive ? 'text-white/55' : 'text-white/30 group-hover:text-white/45'
        }`}>
          {service.description}
        </p>
        <div className="flex sm:hidden items-center gap-2 mt-1.5 text-[10px] font-mono text-white/35">
          <span>{service.duration}</span>
          <span className="text-white/15">·</span>
          <span className="text-[#c9a66b]/70">{service.price}</span>
        </div>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0 hidden sm:flex items-center gap-1.5 text-white/30 group-hover:text-white/45 transition-colors">
        <Clock className="w-3 h-3" />
        <span className="text-xs font-mono">{service.duration}</span>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <span className={`font-serif text-base font-semibold transition-colors duration-300 ${
          isActive ? 'text-[#c9a66b]' : 'text-white/60 group-hover:text-white/80'
        }`}>
          {service.price}
        </span>
      </div>

      {/* Arrow */}
      <motion.div
        className={`flex-shrink-0 transition-colors duration-300 ${
          isActive ? 'text-[#c9a66b]' : 'text-white/15 group-hover:text-white/35'
        }`}
        animate={{ x: isActive ? 2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full flex flex-col"
    >
      {/* Icon */}
      <div className="w-12 h-12 p-2.5 border border-[#c9a66b]/30 text-[#c9a66b] mb-6 bg-[#c9a66b]/5">
        {iconMap[service.id]}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-2 leading-tight">
        {service.title}
      </h3>

      {/* Featured */}
      {service.featured && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a66b] animate-pulse" />
          <span className="text-[10px] text-[#c9a66b] tracking-[0.3em] uppercase font-mono">Mest populære tjeneste</span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#c9a66b]/30 to-transparent mb-5" />

      {/* Description */}
      <p className="text-white/65 text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <p className="text-white/40 text-sm leading-relaxed mb-8">
        {service.details}
      </p>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="border border-white/8 p-4">
          <div className="text-white/30 text-[10px] font-mono tracking-widest uppercase mb-1">Varighet</div>
          <div className="text-white font-serif text-lg">{service.duration}</div>
        </div>
        <div className="border border-[#c9a66b]/20 p-4 bg-[#c9a66b]/5">
          <div className="text-[#c9a66b]/50 text-[10px] font-mono tracking-widest uppercase mb-1">Pris</div>
          <div className="text-[#c9a66b] font-serif text-lg font-semibold">{service.price}</div>
        </div>
      </div>

      {/* Includes */}
      <div className="mb-8">
        <div className="text-white/25 text-[10px] font-mono tracking-widest uppercase mb-3">Inkluderer</div>
        <div className="space-y-2">
          {['Konsultasjon & rådgivning', 'Premium produkter', 'Varm håndkle-behandling', 'Avsluttende styling'].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1 h-1 rounded-full bg-[#c9a66b]/50 flex-shrink-0" />
              <span className="text-white/45 text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <motion.a
          href={OFFICIAL_BOOKING_HREF}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full btn-brass flex items-center justify-center gap-3 py-4 min-h-[52px] text-xs tracking-[0.2em] uppercase font-bold rounded-sm touch-manipulation"
        >
          Book {service.title}
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>
        <p className="text-white/20 text-[10px] text-center mt-3 tracking-wide">
          Ingen betaling på forhånd · Avbestill gratis
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const [activeService, setActiveService] = useState<Service>(serviceCategories[0].services[0]);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-100px' });

  const currentCategory = serviceCategories.find(c => c.id === activeCategory)!;

  const handleSelect = (service: Service) => {
    setActiveService(service);
  };

  return (
    <section id="tjenester" className="relative py-16 sm:py-24 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle diagonal texture */}
      <div className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,166,107,0.8) 40px, rgba(201,166,107,0.8) 41px)`
        }}
      />
      {/* Faint watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-white/[0.012] whitespace-nowrap pointer-events-none select-none leading-none">
        TJENESTER
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="rope-divider w-12" />
            <span className="text-[#c9a66b] text-xs tracking-[0.4em] uppercase font-mono">Våre Tjenester</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white leading-[1.08]">
              Maritim barbering,{' '}
              <br />
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #c9a66b 0%, #f0d898 45%, #a07840 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ekte håndverk
              </span>
            </h2>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs md:text-right">
              Hvert snitt utført med presisjon og sjømannssjel siden 2016.
            </p>
          </div>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-stretch gap-0 mb-0 border-b border-white/8 overflow-x-auto overscroll-x-contain scrollbar-none snap-x snap-mandatory sm:overflow-visible sm:snap-none -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveService(cat.services[0]);
              }}
              className={`relative flex-shrink-0 snap-start min-h-[48px] px-5 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-300 touch-manipulation ${
                activeCategory === cat.id
                  ? 'text-[#c9a66b]'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a66b] to-transparent"
                />
              )}
            </button>
          ))}
          <div className="ml-auto pr-2 hidden md:block">
            <span className="text-white/20 text-xs font-mono tracking-widest">
              {currentCategory.subtitle}
            </span>
          </div>
        </motion.div>

        {/* ── Main content: list + detail panel ── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-0 border border-t-0 border-white/8">

          {/* Left: service rows */}
          <div className="border-r border-white/8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentCategory.services.map((service, i) => (
                  <div key={service.id}>
                    <ServiceRow
                      service={service}
                      index={i}
                      isActive={activeService.id === service.id}
                      onSelect={handleSelect}
                    />
                    {i < currentCategory.services.length - 1 && (
                      <div className="mx-6 h-px bg-white/[0.05]" />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom info strip */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a5c5c]" />
                  <span className="text-white/25 text-[10px] font-mono tracking-widest uppercase">Åpent nå</span>
                </div>
                <span className="text-white/10 text-xs hidden sm:inline">·</span>
                <span className="text-white/20 text-[10px] font-mono">Ring: 462 29 750</span>
              </div>
              <a
                href={OFFICIAL_BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a66b]/60 hover:text-[#c9a66b] text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center gap-1.5 min-h-[44px] sm:min-h-0 touch-manipulation"
              >
                Se alle tider
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right: detail panel */}
          <div className="hidden lg:block p-8 relative overflow-hidden">
            {/* Subtle background for the panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e3d]/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#c9a66b]/15 via-[#c9a66b]/30 to-[#c9a66b]/15" />

            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <ServiceDetail
                  key={activeService.id}
                  service={activeService}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: selected service card */}
        <div className="lg:hidden mt-4">
          <div className="border border-white/8 p-4 sm:p-6 rounded-sm">
            <AnimatePresence mode="wait">
              <ServiceDetail
                key={activeService.id}
                service={activeService}
              />
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
