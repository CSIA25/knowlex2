import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

const AnnouncementBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // This effect runs whenever the user's location (URL path) changes.
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Only show the banner if the user is on the homepage.
    if (pathname === '/') {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // 1.5-second delay
    } else {
      // If on any other page, ensure the banner is closed.
      setIsOpen(false);
    }

    // Cleanup function to clear the timer if the user navigates away
    // before the banner appears.
    return () => clearTimeout(timer);
  }, [pathname]); // Re-run this logic every time the pathname changes.

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 border-0 max-w-3xl bg-transparent shadow-none outline-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Using the direct image URL from images.unsplash.com */}
          <img
            src="https://images.unsplash.com/photo-1749576502454-a0fa6ae62a48?w=400&auto=format&fit=crop"
            alt="A person stands before a large glowing figure, representing educational enlightenment"
            className="w-full h-auto object-contain rounded-xl shadow-2xl"
          />

          {/* Custom Close Button */}
          <DialogClose asChild>
             <button
              aria-label="Close"
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-gray-200 hover:scale-110 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementBanner;