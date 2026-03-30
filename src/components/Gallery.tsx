import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    category: 'Interiør',
    aspect: 'tall',
    src: '/PHOTOS/interior1.jpg',
    label: 'Maritim atmosfære',
    sublabel: 'Den autentiske sjømannsopplevelsen',
  },
  {
    id: 2,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut1.jpg',
    label: 'Fade med skillelinje',
    sublabel: 'Presisjonsklipp i hvert snitt',
  },
  {
    id: 3,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut2.jpg',
    label: 'Lav fade, teksturert topp',
    sublabel: 'Klassisk og maskulin',
  },
  {
    id: 4,
    category: 'Skjegg',
    aspect: 'tall',
    src: '/PHOTOS/cut6.jpg',
    label: 'Klipp & Skjegg',
    sublabel: 'Komplette transformasjoner',
  },
  {
    id: 5,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut3.jpg',
    label: 'Slick back fade',
    sublabel: 'Elegant og tidløs',
  },
  {
    id: 6,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut4.jpg',
    label: 'Klassisk slick back',
    sublabel: 'Forfinet håndverk',
  },
  {
    id: 7,
    category: 'Interiør',
    aspect: 'wide',
    src: '/PHOTOS/barber1.jpg',
    label: 'Mesterens hender',
    sublabel: 'Ekte barberhåndverk i aksjon',
  },
  {
    id: 8,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut5.jpg',
    label: 'Buzz cut med detalj',
    sublabel: 'Ren og kraftfull',
  },
  {
    id: 9,
    category: 'Klipp',
    aspect: 'square',
    src: '/PHOTOS/cut7.jpg',
    label: 'Buzz & Bart',
    sublabel: 'Det maritime mannsidealet',
  },
];

const categories = ['Alle', 'Klipp', 'Skjegg', 'Interiør'];

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: typeof galleryItems[0];
  index: number;
  onOpen: (item: typeof galleryItems[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const aspectClass = {
    tall: 'sm:row-span-2',
    wide: 'sm:col-span-2',
    square: '',
  }[item.aspect] || '';

  const minH =
    item.aspect === 'tall' ? 'min-h-[240px] sm:min-h-[400px]' : 'min-h-[200px] sm:min-h-[220px]';

  return (
    <motion.a
      href={item.src}
      onClick={(e) => {
        e.preventDefault();
        onOpen(item);
      }}
      aria-label={`Åpne bilde: ${item.label}`}
      className={`relative overflow-hidden rounded-sm cursor-pointer block pointer-events-auto ${aspectClass} ${minH}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Real photo */}
      <motion.img
        src={item.src}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover object-top"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/20" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c9a66b]/90 bg-[#0a0a0a]/70 backdrop-blur-sm px-2 py-1">
          {item.category}
        </span>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent z-10"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Mobil: alltid synlig bildetekst (ingen hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 md:hidden bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-14">
        <h3 className="font-serif text-sm font-semibold text-white mb-0.5">{item.label}</h3>
        <p className="text-white/60 text-[11px] tracking-wide leading-snug">{item.sublabel}</p>
      </div>

      {/* Desktop: hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 z-20 hidden md:block"
        animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="font-serif text-base font-semibold text-white mb-0.5">{item.label}</h3>
        <p className="text-white/55 text-xs tracking-wide">{item.sublabel}</p>
      </motion.div>

      {/* Corner brass details */}
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c9a66b]/40 z-10" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#c9a66b]/40 z-10" />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ border: '1px solid rgba(201,166,107,0)' }}
        animate={{ borderColor: hovered ? 'rgba(201,166,107,0.4)' : 'rgba(201,166,107,0)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-100px' });

  const visibleItems =
    activeCategory === 'Alle'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem = lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  const closeLightbox = () => setLightboxIndex(null);
  const openLightbox = (item: (typeof galleryItems)[number]) => {
    const idx = visibleItems.findIndex((v) => v.id === item.id);
    if (idx >= 0) setLightboxIndex(idx);
  };
  const goPrev = () => {
    if (lightboxIndex === null || visibleItems.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + visibleItems.length) % visibleItems.length);
  };
  const goNext = () => {
    if (lightboxIndex === null || visibleItems.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, visibleItems.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  return (
    <section id="galleri" className="relative py-16 sm:py-24 md:py-28 bg-[#080808] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,166,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,166,107,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="rope-divider w-12" />
            <span className="text-[#c9a66b] text-xs tracking-[0.4em] uppercase font-mono">Galleri</span>
            <div className="rope-divider w-12" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white mb-4 sm:mb-5 leading-tight px-2">
            Vår maritime{' '}
            <span className="italic" style={{
              background: 'linear-gradient(135deg, #c9a66b, #f0d898, #a07840)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              verden
            </span>
          </h2>
          <p className="text-white/45 text-sm max-w-lg mx-auto">
            Et glimt inn i Oslos mest unike barbershop-opplevelse.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 min-h-[44px] text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono transition-all duration-300 rounded-sm touch-manipulation ${
                activeCategory === cat
                  ? 'bg-[#c9a66b] text-[#0a0a0a] font-bold'
                  : 'border border-white/10 text-white/50 hover:border-[#c9a66b]/40 hover:text-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry: én kolonne på små skjermer for roligere layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 sm:auto-rows-[minmax(220px,auto)]">
          {visibleItems.length === 0 ? (
            <p className="col-span-full text-center text-white/40 text-sm py-12 font-mono tracking-wide">
              Ingen bilder i denne kategorien.
            </p>
          ) : (
            visibleItems.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onOpen={openLightbox} />
            ))
          )}
        </div>

        {/* "More on Instagram" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#c9a66b]/30 text-[#c9a66b] text-xs tracking-[0.2em] uppercase font-mono hover:bg-[#c9a66b]/5 transition-all rounded-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Følg Oss på Instagram
            </motion.button>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Lukk bildevisning"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full border border-white/20 bg-black/45 text-white/80 hover:text-white hover:border-[#c9a66b]/50 flex items-center justify-center touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>

            {visibleItems.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Forrige bilde"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/45 text-white/80 hover:text-white hover:border-[#c9a66b]/50 flex items-center justify-center touch-manipulation"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Neste bilde"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/45 text-white/80 hover:text-white hover:border-[#c9a66b]/50 flex items-center justify-center touch-manipulation"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              className="h-full w-full flex items-center justify-center"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <figure className="max-w-[95vw] sm:max-w-[88vw]">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.label}
                  className="max-h-[78vh] sm:max-h-[82vh] w-auto max-w-full object-contain rounded-sm border border-white/10"
                />
                <figcaption className="mt-3 text-center">
                  <h3 className="font-serif text-white text-lg">{selectedItem.label}</h3>
                  <p className="text-white/60 text-xs tracking-wide mt-1">{selectedItem.sublabel}</p>
                </figcaption>
              </figure>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
