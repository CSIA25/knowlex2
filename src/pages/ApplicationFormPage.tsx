import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApplicationFormPage = () => {
  // Your specific Google Form URL is already here.
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdq1eQMmGZWhzGxUelc38A9jO9OThDVuSpxpRThz_94qPPr6Q/viewform?embedded=true";

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } as const },
  };
  
  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, delay: 0.5, duration: 0.5 } as const },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Animated background blob for a fluid feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-primary/10 rounded-full blur-[150px] animated-blob -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl flex flex-col items-center"
      >
        {/* Animated Header */}
        <motion.div variants={itemVariants} className="w-full text-left mb-12">
           <Link to="/" className="text-2xl font-semibold text-glow hover:opacity-80 transition-opacity flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
               <FileText className="w-5 h-5 text-white" />
             </div>
             Knowlex Application
          </Link>
        </motion.div>

        {/* Animated Title & Subtitle */}
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Begin Your Journey</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
                This is the first step towards your global education. Please fill out the details below with care.
            </p>
        </motion.div>

        {/* Animated Form Container */}
        <motion.div
          variants={formVariants}
          className="w-full h-[75vh] max-w-4xl bg-background/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/10 overflow-hidden"
        >
          <iframe
            src={GOOGLE_FORM_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Knowlex Application Form"
            className="rounded-2xl"
          >
            Loading…
          </iframe>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-center text-muted-foreground text-xs mt-4">
          Having trouble? <a href={GOOGLE_FORM_URL.replace("?embedded=true", "")} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Open form in a new tab</a>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ApplicationFormPage;