import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { barbers } from '../data/content';
import { Anchor } from 'lucide-react';

export default function Team() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-100px' });

  return (
    <section id="team" className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#060f1e]/70 to-[#0a0a0a]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="rope-divider w-12" />
            <span className="text-[#c9a66b] text-xs tracking-[0.4em] uppercase font-mono">Mannskapet</span>
            <div className="rope-divider w-12" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight px-2">
            Møt{' '}
            <span className="italic" style={{
              background: 'linear-gradient(135deg, #c9a66b, #f0d898, #a07840)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              mannskapet
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {barbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="glass-card rounded-sm overflow-hidden">
                {/* Portrait area */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e3d] via-[#0a5c5c]/20 to-[#0a0a0a]" />

                  {/* Decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a66b]/20 to-[#0a5c5c]/30 flex items-center justify-center border border-[#c9a66b]/20 group-hover:border-[#c9a66b]/50 transition-colors">
                        <span className="font-display text-3xl text-[#c9a66b]/60 group-hover:text-[#c9a66b]/80 transition-colors">
                          {barber.initials}
                        </span>
                      </div>
                      {/* Compass ring around avatar */}
                      <motion.div
                        className="absolute -inset-4 border border-[#c9a66b]/10 rounded-full group-hover:border-[#c9a66b]/25 transition-colors"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        style={{ borderStyle: 'dashed' }}
                      />
                    </motion.div>
                  </div>

                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(rgba(201,166,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,107,1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Top line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a66b]/40 to-transparent" />
                </div>

                {/* Brass nameplate */}
                <div className="relative p-6">
                  <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a66b]/30 to-transparent" />

                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#e0c28a] transition-colors mb-1">
                      {barber.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Anchor className="w-3 h-3 text-[#c9a66b]/60" />
                      <span className="text-[#c9a66b]/70 text-xs tracking-widest uppercase font-mono">
                        {barber.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4 group-hover:text-white/65 transition-colors">
                    {barber.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 border border-[#c9a66b]/15 text-[#c9a66b]/60 group-hover:border-[#c9a66b]/30 group-hover:text-[#c9a66b]/80 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#c9a66b]/20 group-hover:border-[#c9a66b]/50 transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#c9a66b]/20 group-hover:border-[#c9a66b]/50 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
