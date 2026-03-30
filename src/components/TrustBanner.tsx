import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';
import { trustBadges } from '../data/content';

const items = [...trustBadges, ...trustBadges, ...trustBadges];

export default function TrustBanner() {
  return (
    <div className="relative py-5 overflow-hidden border-y border-[#c9a66b]/10 bg-[#060f1e]/60">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

      <motion.div
        className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((badge, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="text-lg">{badge.icon}</span>
            <span className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase">
              {badge.label}
            </span>
            <Anchor className="w-2.5 h-2.5 text-[#c9a66b]/20 ml-4" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
