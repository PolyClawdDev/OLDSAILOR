import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingBookButton from './components/FloatingBookButton';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main className="relative z-0">
            <Hero />
            <TrustBanner />
            <Services />
            <About />
            <Gallery />
            <Reviews />
            <Team />
          </main>
          <Footer />
          <FloatingBookButton />
        </>
      )}
    </>
  );
}
