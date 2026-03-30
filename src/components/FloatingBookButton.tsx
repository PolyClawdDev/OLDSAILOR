import { motion, useScroll, useTransform } from 'framer-motion';
import { Anchor } from 'lucide-react';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

export default function FloatingBookButton() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="floating-book-btn z-50 md:hidden"
      style={{ opacity }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    >
      <motion.a
        href={OFFICIAL_BOOKING_HREF}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{
          boxShadow: [
            '0 0 15px rgba(201,166,107,0.3)',
            '0 0 30px rgba(201,166,107,0.6)',
            '0 0 15px rgba(201,166,107,0.3)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="btn-brass flex items-center gap-2.5 px-5 py-3.5 min-h-[48px] text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-bold rounded-full shadow-lg touch-manipulation"
      >
        <Anchor className="w-3.5 h-3.5" />
        Book Nå
      </motion.a>
    </motion.div>
  );
}
