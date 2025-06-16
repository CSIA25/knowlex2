import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 container px-6"
      >
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading">
          Your Gateway to Global <span className="text-primary">Scholarship</span>.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300 sm:max-w-xl lg:max-w-3xl mx-auto">
          Unlock world-class scholarships with expert mentorship, and comprehensive support. We turn your potential into a globally recognized success story.
        </p>

        {/* Buttons for Mobile View */}
        <div className="mt-8 flex flex-col sm:hidden items-center gap-4">
            <Button 
                size="lg"
                className="w-full max-w-xs"
                onClick={() => navigate('/services/global-scholarship-program')}
            >
                Global Scholarship
            </Button>
            <Button 
                size="lg"
                variant="outline"
                className="w-full max-w-xs bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => navigate('/inquiry')}
            >
                Inquiry Form
            </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;