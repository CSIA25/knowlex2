import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles } from 'lucide-react';

const MovingBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if the banner was dismissed
    const isDismissed = localStorage.getItem('knowlex-banner-dismissed');
    if (!isDismissed) {
      // Use a timeout to delay the banner's appearance slightly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5); // 0.5s delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('knowlex-banner-dismissed', 'true');
  };

  const bannerContent = (
    <>
      <span className="mx-8 flex items-center gap-2">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        Apply Now for the Global Scholarship Program!
        <Link to="/services/global-scholarship-program" className="ml-2 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity flex items-center gap-1">
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </span>
      <span className="mx-8 flex items-center gap-2">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        Limited Seats Available for Fall 2024 Intake.
        <Link to="/services/global-scholarship-program" className="ml-2 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity flex items-center gap-1">
          Explore Now <ArrowRight className="w-4 h-4" />
        </Link>
      </span>
      <span className="mx-8 flex items-center gap-2">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        Unlock Your Future with a World-Class Education.
        <Link to="/services/global-scholarship-program" className="ml-2 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity flex items-center gap-1">
          Begin Your Journey <ArrowRight className="w-4 h-4" />
        </Link>
      </span>
    </>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-[60] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-foreground overflow-hidden"
        >
          <div className="container mx-auto px-6 h-12 flex items-center justify-between">
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee-slow whitespace-nowrap flex">
                <div className="flex">{bannerContent}</div>
                <div className="flex" aria-hidden="true">{bannerContent}</div>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/20 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovingBanner;