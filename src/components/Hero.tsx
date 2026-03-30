import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Anchor, Star, ChevronDown } from 'lucide-react';
import { BRAND_LOGO_SRC } from '../branding';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

/**
 * Samme klipp som `BACKROUND.mov`, men Chrome krever H.264 i `.mp4` i `<video>`.
 * `BACKROUND.mp4` genereres fra .mov med `npm run video:chrome` (ffmpeg).
 */
const HERO_VIDEO_SOURCES = [
  { src: '/BACKROUND.mp4', type: 'video/mp4' },
  { src: '/BACKROUND.mov', type: 'video/quicktime' },
] as const;

/** Kun ved feil (video-elementet har ikke poster — Chrome holdt ofte fast på poster-bildet uten at play() startet). */
const HERO_POSTER = '/PHOTOS/interior1.jpg';

/** Én query per full sideinnlasting i dev — tvinger Chrome til å hente MP4 på nytt etter endringer. */
const HERO_DEV_VIDEO_Q = import.meta.env.DEV ? `?t=${Date.now()}` : '';
const videoSrc = (path: string) => (import.meta.env.DEV ? `${path}${HERO_DEV_VIDEO_Q}` : path);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoFailed) return;

    const kickPlay = () => {
      v.muted = true;
      v.defaultMuted = true;
      v.playbackRate = 0.92;
      void v.play().catch((err) => {
        if (import.meta.env.DEV) console.warn('[Hero video] play() failed:', err);
      });
    };

    const onPlaying = () => setVideoPlaying(true);
    const onPause = () => setVideoPlaying(false);
    const onWaiting = () => setVideoPlaying(false);

    kickPlay();
    v.addEventListener('loadeddata', kickPlay);
    v.addEventListener('canplay', kickPlay);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('pause', onPause);
    v.addEventListener('waiting', onWaiting);

    return () => {
      v.removeEventListener('loadeddata', kickPlay);
      v.removeEventListener('canplay', kickPlay);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('waiting', onWaiting);
    };
  }, [videoFailed]);

  return (
    <section
      ref={ref}
      id="hjem"
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/*
        Statisk lag uten transform: Framer-motion transform på video-laget kan gi feil stacking
        så header (fixed z-100) alltid ligger over. Video dekker hele viewport-toppen bak nav.
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" aria-hidden />

        {!videoFailed ? (
          <video
            key="hero-bg"
            ref={videoRef}
            className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center scale-[1.03] [transform:translateZ(0)] will-change-transform"
            autoPlay
            muted
            playsInline
            preload="auto"
            loop
            disablePictureInPicture
            aria-hidden
            onError={() => {
              if (import.meta.env.DEV) {
                const el = videoRef.current;
                console.warn('[Hero video] error', el?.error?.code, el?.error?.message);
              }
              setVideoFailed(true);
            }}
          >
            {HERO_VIDEO_SOURCES.map(({ src, type }) => (
              <source key={src} src={videoSrc(src)} type={type} />
            ))}
          </video>
        ) : (
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden
          />
        )}

        {/* Cinematic overlays — lettere i midten så videoen synes tydelig */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/72 via-[#0a0a0a]/30 to-[#0a0a0a]/86" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/55 via-transparent to-[#0a0a0a]/55" />

        {/* Subtle navy tint */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(10,92,92,0.35) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(11,30,61,0.55) 0%, transparent 50%)
            `,
          }}
        />

        {/* Light grain over video */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(201,166,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,107,1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Animated wave lines */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[200%] left-[-50%]"
            style={{ bottom: `${15 + i * 12}%` }}
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 1440 60" fill="none" className="w-full">
              <path
                d={`M0,${20 + i * 5} C240,${40 + i * 3} 480,${10 + i * 3} 720,${20 + i * 5} C960,${30 + i * 3} 1200,${10 + i * 3} 1440,${20 + i * 5}`}
                stroke={`rgba(201,166,107,${0.06 - i * 0.015})`}
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#c9a66b' : i % 3 === 1 ? '#0a5c5c' : 'rgba(255,255,255,0.5)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content — z-20; luft under fixed nav + safe area på mobil */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-[max(3.25rem,calc(env(safe-area-inset-top,0px)+2.35rem))] pb-10 sm:pt-6 sm:pb-16"
        style={{ opacity }}
      >
        {/* Logo: stor, messingramme + mørk bakplate så svart/hvitt-emblemet synes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'backOut' }}
          className="flex justify-center mb-10"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-[#c9a66b]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <div
              className="relative rounded-full p-[3px] shadow-[0_0_0_1px_rgba(201,166,107,0.55),0_12px_48px_rgba(0,0,0,0.8),0_0_72px_rgba(201,166,107,0.4)]"
              style={{
                background: 'linear-gradient(145deg, #f0d898 0%, #c9a66b 35%, #8b6914 70%, #c9a66b 100%)',
              }}
            >
              <div className="rounded-full p-2.5 bg-[#120e0b] ring-2 ring-black/70">
                <img
                  src={BRAND_LOGO_SRC}
                  alt="Old Sailor Barbershop logo"
                  width={176}
                  height={176}
                  className="block w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover"
                  style={{
                    filter: 'drop-shadow(0 0 18px rgba(201,166,107,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.95))',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="rope-divider w-16" />
          <div className="glass-card px-4 py-1.5 rounded-full flex items-center gap-2">
            <Anchor className="w-3 h-3 text-[#c9a66b]" />
            <span className="text-xs font-mono text-[#c9a66b] tracking-[0.25em] uppercase">Siden 2016 · Bislett, Oslo</span>
          </div>
          <div className="rope-divider w-16" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4"
        >
          <h1 className="font-display text-[clamp(2rem,8vw,9rem)] sm:text-[clamp(2.85rem,11vw,9rem)] font-light leading-[0.9] tracking-tight text-white">
            Old{' '}
            <span className="italic text-brass-gradient" style={{
              background: 'linear-gradient(135deg, #c9a66b 0%, #f0d898 40%, #a07840 70%, #c9a66b 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sailor
            </span>
          </h1>
          <div className="font-serif text-[clamp(0.7rem,2.75vw,2.2rem)] sm:text-[clamp(1.2rem,3vw,2.2rem)] text-white/60 tracking-[0.28em] sm:tracking-[0.3em] uppercase font-light mt-1 sm:mt-2">
            Barbershop
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-4 my-8"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a66b]/60" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#c9a66b" strokeWidth="1" opacity="0.5" />
              <circle cx="12" cy="12" r="6" stroke="#c9a66b" strokeWidth="1" opacity="0.7" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#c9a66b" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#c9a66b" strokeWidth="1" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#c9a66b" strokeWidth="0.7" opacity="0.5" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" stroke="#c9a66b" strokeWidth="0.7" opacity="0.5" />
              <circle cx="12" cy="12" r="2" fill="#c9a66b" />
            </svg>
          </motion.div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a66b]/60" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/55 text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-widest uppercase font-light mb-8 sm:mb-12 max-w-xl mx-auto px-1"
        >
          Maritim luksus i hvert snitt
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full max-w-md sm:max-w-none mx-auto sm:mx-0"
        >
          <motion.a
            href={OFFICIAL_BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-brass flex items-center justify-center gap-3 px-8 sm:px-10 py-4 min-h-[52px] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold rounded-sm shadow-[0_0_30px_rgba(201,166,107,0.25)] w-full sm:w-auto touch-manipulation"
          >
            <Anchor className="w-4 h-4" />
            Book Din Time Nå
          </motion.a>
          <motion.a
            href="#om-oss"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-white/70 hover:text-white border border-white/15 hover:border-[#c9a66b]/40 rounded-sm transition-all w-full sm:w-auto touch-manipulation"
          >
            Vår Historie
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 px-2"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c9a66b] text-[#c9a66b]" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">4.9</span>
            <span className="text-white/40 text-xs">(220 Google)</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-white/15" />

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c9a66b] text-[#c9a66b]" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">4.9</span>
            <span className="text-white/40 text-xs">(162 Infobel)</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-white/15" />

          <div className="flex items-center gap-2 text-[#c9a66b]/70">
            <Anchor className="w-3.5 h-3.5" />
            <span className="text-xs tracking-widest uppercase">Siden 2016</span>
          </div>
        </motion.div>
      </motion.div>


      {import.meta.env.DEV && (
        <div className="absolute left-3 bottom-3 z-30 text-[10px] font-mono tracking-wider text-white/70 bg-black/45 px-2 py-1 rounded">
          VIDEO: {videoFailed ? 'FAILED' : videoPlaying ? 'PLAYING' : 'LOADING'}
        </div>
      )}

      {/* Floating anchor */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block z-10"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" opacity="0.12">
          <circle cx="30" cy="15" r="12" stroke="#c9a66b" strokeWidth="3" />
          <circle cx="30" cy="15" r="5" stroke="#c9a66b" strokeWidth="2" />
          <line x1="30" y1="27" x2="30" y2="65" stroke="#c9a66b" strokeWidth="3" />
          <line x1="10" y1="45" x2="50" y2="45" stroke="#c9a66b" strokeWidth="3" />
          <path d="M10 45 Q10 65 30 65" stroke="#c9a66b" strokeWidth="3" fill="none" />
          <path d="M50 45 Q50 65 30 65" stroke="#c9a66b" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>

      {/* Floating compass left */}
      <motion.div
        className="absolute left-8 top-1/3 hidden xl:block z-10"
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity="0.1">
          <circle cx="25" cy="25" r="23" stroke="#c9a66b" strokeWidth="2" />
          <circle cx="25" cy="25" r="18" stroke="#c9a66b" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="25,5 28,25 25,22 22,25" fill="#c9a66b" />
          <polygon points="25,45 22,25 25,28 28,25" fill="#c9a66b" opacity="0.4" />
          <circle cx="25" cy="25" r="3" fill="#c9a66b" />
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))] sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('tjenester')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] text-white/30 tracking-[0.4em] uppercase font-mono">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[#c9a66b]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
