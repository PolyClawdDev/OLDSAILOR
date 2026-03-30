import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useId, forwardRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '../data/content';
import { OFFICIAL_BOOKING_HREF } from '../officialBooking';

type Review = (typeof reviews)[number];

const CARD_GAP_PX = 24;

/** Gylne stjerner (1–5); tomme stjerner i diskret grå */
function GoldenStars({ size = 'md', rating = 5 }: { size?: 'sm' | 'md' | 'lg'; rating?: number }) {
  const gid = useId().replace(/:/g, '');
  const dim = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3';
  const gradId = `goldStarFill-${gid}`;
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex gap-0.5 items-center" aria-hidden>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fce08a" />
            <stop offset="35%" stopColor="#e8c547" />
            <stop offset="70%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>
      {[0, 1, 2, 3, 4].map((i) => {
        const isGold = i < filled;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`${dim} flex-shrink-0`}
            style={{
              filter: isGold
                ? 'drop-shadow(0 0 3px rgba(232, 197, 71, 0.45)) drop-shadow(0 1px 0 rgba(0,0,0,0.4))'
                : undefined,
            }}
          >
            <path
              fill={isGold ? `url(#${gradId})` : 'rgba(255,255,255,0.06)'}
              stroke={isGold ? '#a07840' : 'rgba(255,255,255,0.12)'}
              strokeWidth="0.35"
              d="M12 2l2.8 6.9h7.2l-5.8 4.3 2.2 7.1L12 17.8l-6.4 4.5 2.2-7.1-5.8-4.3h7.2L12 2z"
            />
          </svg>
        );
      })}
    </div>
  );
}

const ReviewCard = forwardRef<HTMLDivElement, { review: Review }>(function ReviewCard({ review }, ref) {
  return (
    <div
      ref={ref}
      className={`group relative flex-shrink-0 w-[calc(100vw-2rem)] max-w-[min(100vw-2rem,360px)] sm:w-[360px] sm:max-w-none h-full min-h-[280px] sm:min-h-[300px] flex flex-col rounded-sm border bg-gradient-to-b from-[#0b1e3d]/35 to-[#0a0a0a]/90 backdrop-blur-md overflow-hidden snap-start ${
        review.rating >= 4 ? 'border-[#c9a66b]/15' : 'border-white/10 opacity-[0.92]'
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,166,107,0.08),transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a66b]/40 to-transparent" />

      <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-col gap-1 items-start">
            <GoldenStars size="md" rating={review.rating} />
            {review.rating < 4 && (
              <span className="text-[9px] font-mono text-white/35 tracking-widest uppercase">Vurdering {review.rating}/5</span>
            )}
          </div>
          <span
            className={`text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-1 border flex-shrink-0 ${
              review.source === 'Google'
                ? 'text-white/70 border-white/15 bg-white/[0.04]'
                : 'text-[#5eead4] border-[#5eead4]/25 bg-[#5eead4]/5'
            }`}
          >
            {review.source}
          </span>
        </div>

        <div className="absolute top-4 right-14 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
          <Quote className="w-16 h-16 text-[#c9a66b]" />
        </div>

        <p className="text-white/78 text-sm leading-relaxed mb-6 flex-1 line-clamp-[8] sm:line-clamp-6">
          «{review.text}»
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a66b]/25 to-[#0a5c5c]/20 border border-[#c9a66b]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-semibold text-[#e0c28a] tracking-tight">{review.avatar}</span>
          </div>
          <div className="min-w-0">
            <div className="text-white font-medium text-sm truncate">{review.name}</div>
            <div className="text-white/35 text-xs">{review.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Reviews() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-100px' });
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [itemsPerView, setItemsPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stepPx, setStepPx] = useState(384);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setItemsPerView(3);
      else if (w >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const measureStep = useCallback(() => {
    const card = firstCardRef.current;
    if (!card) return;
    const w = card.getBoundingClientRect().width;
    setStepPx(w + CARD_GAP_PX);
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener('resize', measureStep);
    const ro = new ResizeObserver(measureStep);
    if (firstCardRef.current) ro.observe(firstCardRef.current);
    return () => {
      window.removeEventListener('resize', measureStep);
      ro.disconnect();
    };
  }, [measureStep, itemsPerView]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const t = window.setInterval(goNext, 5500);
    return () => clearInterval(t);
  }, [paused, goNext, maxIndex]);

  const translateX = -(index * stepPx);

  const pageCount = maxIndex + 1;
  const dotStride = pageCount > 18 ? Math.ceil(pageCount / 12) : 1;
  const dotIndices = (() => {
    const out: number[] = [];
    for (let s = 0; s < maxIndex; s += dotStride) out.push(s);
    if (out[out.length - 1] !== maxIndex) out.push(maxIndex);
    return out;
  })();
  const activeDotBucket = dotIndices.findIndex((slide, i) => {
    const next = dotIndices[i + 1] ?? maxIndex + 1;
    return index >= slide && index < next;
  });

  return (
    <section
      id="anmeldelser"
      className="relative py-16 sm:py-24 md:py-28 bg-[#080808] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,166,107,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(11,30,61,0.35), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="rope-divider w-12" />
            <span className="text-[#c9a66b] text-xs tracking-[0.4em] uppercase font-mono">Anmeldelser</span>
            <div className="rope-divider w-12" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white mb-5 sm:mb-6 leading-tight px-2">
            Hva sier{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #fce08a, #e8c547, #a07840)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              sjøfarerne
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-3 sm:gap-4 md:gap-8 mb-4 max-w-lg sm:max-w-none mx-auto">
            <div className="glass-card px-6 sm:px-8 py-4 sm:py-5 rounded-sm border border-[#c9a66b]/20 text-center w-full sm:min-w-[200px] sm:w-auto">
              <div className="flex justify-center mb-2">
                <GoldenStars size="lg" />
              </div>
              <div className="font-display text-4xl font-light text-[#e8c547] mb-0.5">4,9</div>
              <div className="text-white/45 text-xs tracking-wider">Google · 220+ anmeldelser</div>
            </div>
            <div className="glass-card px-6 sm:px-8 py-4 sm:py-5 rounded-sm border border-[#c9a66b]/20 text-center w-full sm:min-w-[200px] sm:w-auto">
              <div className="flex justify-center mb-2">
                <GoldenStars size="lg" />
              </div>
              <div className="font-display text-4xl font-light text-[#e8c547] mb-0.5">4,9</div>
              <div className="text-white/45 text-xs tracking-wider">Infobel · 162 anmeldelser</div>
            </div>
            <div className="glass-card px-6 sm:px-8 py-4 sm:py-5 rounded-sm border border-[#5eead4]/20 text-center w-full sm:min-w-[200px] sm:w-auto">
              <div className="flex justify-center mb-2">
                <GoldenStars size="lg" />
              </div>
              <div className="font-display text-4xl font-light text-[#e8c547] mb-0.5">5,0</div>
              <div className="text-white/45 text-xs tracking-wider">Fresha · toppvurdert</div>
            </div>
          </div>
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase max-w-lg mx-auto">
            {reviews.length} ekte anmeldelser · inkl. alle vurderinger vi har fått tillatelse til å vise
          </p>
        </motion.div>

        <div className="relative">
          <motion.button
            type="button"
            aria-label="Forrige anmeldelser"
            onClick={goPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 -ml-2 md:-ml-4 flex items-center justify-center rounded-full border border-[#c9a66b]/30 bg-[#0a0a0a]/90 text-[#c9a66b] hover:border-[#c9a66b]/60 hover:bg-[#c9a66b]/10 transition-colors hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Neste anmeldelser"
            onClick={goNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 -mr-2 md:-mr-4 flex items-center justify-center rounded-full border border-[#c9a66b]/30 bg-[#0a0a0a]/90 text-[#c9a66b] hover:border-[#c9a66b]/60 hover:bg-[#c9a66b]/10 transition-colors hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <div className="overflow-hidden mx-0 sm:mx-12 md:mx-14">
            <motion.div
              className="flex gap-6 pb-2"
              style={{ gap: CARD_GAP_PX }}
              animate={{ x: translateX }}
              transition={{ type: 'spring', stiffness: 400, damping: 38 }}
            >
              {reviews.map((review, i) => (
                <ReviewCard key={review.id} ref={i === 0 ? firstCardRef : undefined} review={review} />
              ))}
            </motion.div>
          </div>

          <div className="flex sm:hidden justify-center gap-6 mt-6">
            <motion.button
              type="button"
              aria-label="Forrige"
              onClick={goPrev}
              whileTap={{ scale: 0.95 }}
              className="min-w-[48px] min-h-[48px] rounded-full border border-[#c9a66b]/30 text-[#c9a66b] flex items-center justify-center touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Neste"
              onClick={goNext}
              whileTap={{ scale: 0.95 }}
              className="min-w-[48px] min-h-[48px] rounded-full border border-[#c9a66b]/30 text-[#c9a66b] flex items-center justify-center touch-manipulation"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-3xl mx-auto px-2">
            {dotIndices.map((slideIndex, di) => (
              <button
                key={`${slideIndex}-${di}`}
                type="button"
                aria-label={`Gå til anmeldelse ${slideIndex + 1}`}
                onClick={() => setIndex(slideIndex)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  di === (activeDotBucket >= 0 ? activeDotBucket : 0)
                    ? 'w-8 bg-gradient-to-r from-[#fce08a] via-[#e8c547] to-[#a07840] shadow-[0_0_10px_rgba(232,197,71,0.35)]'
                    : 'w-1.5 bg-white/20 hover:bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-14"
        >
          <motion.a
            href={OFFICIAL_BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-brass inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 min-h-[52px] w-full max-w-sm sm:w-auto sm:max-w-none text-xs tracking-[0.2em] uppercase font-bold rounded-sm touch-manipulation"
          >
            Bli neste fornøyde kunde
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
