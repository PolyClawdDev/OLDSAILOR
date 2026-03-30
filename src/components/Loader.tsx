import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BRAND_LOGO_SRC } from '../branding';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setPhase(1);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 0 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(201,166,107,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,107,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative mb-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            {/* Spinning brass ring behind logo */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                border: '1px solid rgba(201,166,107,0.25)',
                borderStyle: 'dashed',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-8 rounded-full"
              style={{
                border: '1px solid rgba(201,166,107,0.1)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            />

            {/* Logo med messingramme (samme som header) */}
            <div
              className="relative rounded-full p-[3px]"
              style={{
                background: 'linear-gradient(145deg, #f0d898, #c9a66b, #8b6914)',
                boxShadow: '0 0 40px rgba(201,166,107,0.45), 0 12px 40px rgba(0,0,0,0.6)',
              }}
            >
              <div className="rounded-full p-2 bg-[#120e0b] ring-2 ring-black/60">
                <motion.img
                  src={BRAND_LOGO_SRC}
                  alt="Old Sailor Barbershop"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover block"
                  style={{
                    filter: 'drop-shadow(0 0 16px rgba(201,166,107,0.45))',
                  }}
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201,166,107,0.12) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-48 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-[1px] bg-white/10 w-full" />
            <motion.div
              className="h-[1px] absolute top-0 left-0"
              style={{
                background: 'linear-gradient(90deg, #a07840, #f0d898, #c9a66b)',
                width: `${Math.min(progress, 100)}%`,
                boxShadow: '0 0 8px rgba(201,166,107,0.8)'
              }}
              transition={{ ease: 'linear' }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-white/30 font-mono tracking-widest">LASTER INN</span>
              <span className="text-[10px] text-[#c9a66b]/70 font-mono">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
