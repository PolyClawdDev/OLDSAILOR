import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Anchor, MapPin, Clock, Award } from 'lucide-react';
import { stats } from '../data/content';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="om-oss" ref={containerRef} className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#060f1e] to-[#0a0a0a]" />

      {/* Decorative rope lines */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px opacity-20"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, #c9a66b 8px, #c9a66b 16px)',
          y
        }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px opacity-20"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, #c9a66b 8px, #c9a66b 16px)',
          y
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="rope-divider w-12" />
            <span className="text-[#c9a66b] text-xs tracking-[0.4em] uppercase font-mono">Vår Historie</span>
            <div className="rope-divider w-12" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight px-2">
            Oslos eneste{' '}
            <br />
            <span className="italic" style={{
              background: 'linear-gradient(135deg, #c9a66b, #f0d898, #a07840)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              maritime barbershop
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Real interior photo frame */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="/PHOTOS/interior1.jpg"
                alt="Old Sailor Barbershop interiør"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.85) saturate(0.9)' }}
              />

              {/* Dark gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />

              {/* Year badge overlay */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="glass-card px-6 py-3 text-center border border-[#c9a66b]/20">
                  <div className="font-display text-3xl font-light text-[#c9a66b]">OSLO EST. 2016</div>
                  <div className="text-white/40 text-xs tracking-widest uppercase mt-1">Det ekte maritime</div>
                </div>
              </div>

              {/* Brass frame corners */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-[#c9a66b]/50 ${cls}`} />
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass-card p-4 rounded-sm text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              animate={{ y: [0, -5, 0] }}
            >
              <div className="text-2xl font-display font-bold text-[#c9a66b]">4.9★</div>
              <div className="text-white/50 text-xs tracking-wider mt-0.5">220 anmeldelser</div>
            </motion.div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="text-white/70 text-lg leading-relaxed">
                I 2016 åpnet dørene til Oslo's mest unike barbershop i hjertet av{' '}
                <span className="text-[#c9a66b] font-medium">Bislett-distriktet</span>. 
                Old Sailor Barbershop er ikke bare et sted å klippe seg – det er en reise inn i 
                en maritim verden av eleganse og tradisjon.
              </p>
              <p className="text-white/55 text-base leading-relaxed">
                Med autentisk maritime interiør – treverk, messing, tau og nautiske detaljer – 
                er vi det{' '}
                <span className="text-white/80">eneste barbershopet i Oslo</span>{' '}
                med et ekte sjømannstema. Hver detalj er nøye valgt for å skape en atmosfære 
                av klassisk maskulin luksus.
              </p>
              <p className="text-white/55 text-base leading-relaxed">
                Bak hvert klipp ligger år med erfaring og en lidenskap for barberhåndverket 
                som sjelden ses. Vi kombinerer klassiske teknikker med moderne kunnskap for 
                å gi deg et resultat som er like unikt som vår sjel.
              </p>

              {/* Features list */}
              <div className="space-y-3 pt-2">
                {[
                  { icon: <MapPin className="w-4 h-4" />, text: 'Thereses gate 18, Bislett, Oslo' },
                  { icon: <Clock className="w-4 h-4" />, text: 'Man–Lør: 10:00–20:00 · Søn: 11:00–18:00' },
                  { icon: <Award className="w-4 h-4" />, text: 'Eneste maritime barbershop i Oslo' },
                  { icon: <Anchor className="w-4 h-4" />, text: 'Over 8 år med ekspertise siden 2016' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="text-[#c9a66b] flex-shrink-0">{item.icon}</div>
                    <span className="text-white/60 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={OFFICIAL_BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brass inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold rounded-sm mt-4"
              >
                <Anchor className="w-3.5 h-3.5" />
                Book Din Reise
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#c9a66b]/10 border border-[#c9a66b]/10 rounded-sm overflow-hidden"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#0b1e3d]/50 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="font-display text-3xl md:text-4xl font-light text-[#c9a66b] group-hover:text-[#f0d898] transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
