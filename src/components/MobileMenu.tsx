import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Search, Menu, X, ChevronDown, Home, Sparkles, Camera, Calendar, Phone } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const mainNavLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Media Hub', path: '/media', icon: Camera },
  { name: 'Contact', path: '/contact', icon: Phone },
];

const servicesSubLinks = [
    { name: 'All Services', path: '/services' },
    { name: 'Global Scholarship Program', path: '/services/global-scholarship-program' },
    { name: 'School Consulting', path: '/services/school-consulting' },
    { name: 'Professional Trainings', path: '/services/professional-trainings' },
];


interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(location.pathname.startsWith('/services'));
  const { user, isSuperadmin, isFather } = useAuth();
  const navigate = useNavigate();
  
  // Split links for custom ordering
  const homeLink = mainNavLinks.find(link => link.name === 'Home');
  const otherMainLinks = mainNavLinks.filter(link => link.name !== 'Home');

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate('/');
  };
  
  // Effect to handle body scroll and set initial accordion state when menu opens
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        setIsServicesOpen(location.pathname.startsWith('/services'));
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    };
  }, [isOpen, location.pathname]);

  // Effect to close the menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const menuVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
  };

  return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          >
            <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-card text-card-foreground shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></Button>
              </div>
              
              <div className="p-6 flex flex-col flex-grow overflow-y-auto">
                <motion.ul variants={menuVariants} initial="hidden" animate="visible" className="space-y-1">
                    {/* Render Home link first */}
                    {homeLink && (
                        <motion.li key={homeLink.path} variants={itemVariants}>
                            <Link to={homeLink.path} className={cn(
                                "flex items-center gap-4 text-xl font-light py-3 px-4 rounded-lg transition-colors",
                                location.pathname === homeLink.path ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}>
                                <homeLink.icon className="w-5 h-5" />
                                {homeLink.name}
                            </Link>
                        </motion.li>
                    )}

                    {/* Render Services accordion second */}
                     <motion.li variants={itemVariants}>
                        <div onClick={() => setIsServicesOpen(!isServicesOpen)} className={cn(
                            "flex items-center justify-between cursor-pointer text-xl font-light py-3 px-4 rounded-lg transition-colors",
                            location.pathname.startsWith('/services') ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}>
                            <div className="flex items-center gap-4">
                                <Sparkles className="w-5 h-5" />
                                Services
                            </div>
                            <ChevronDown className={cn("w-5 h-5 transition-transform", isServicesOpen && "rotate-180")} />
                        </div>
                        <AnimatePresence>
                        {isServicesOpen && (
                            <motion.ul 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="pl-8 pt-1 space-y-1 overflow-hidden"
                            >
                                {servicesSubLinks.map(sublink => (
                                    <motion.li key={sublink.path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.2}}>
                                         <Link to={sublink.path} className={cn(
                                             "block py-2 px-4 rounded-md text-base font-light",
                                             location.pathname === sublink.path ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                                         )}>{sublink.name}</Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    </motion.li>

                    {/* Render the rest of the main links */}
                    {otherMainLinks.map(link => (
                        <motion.li key={link.path} variants={itemVariants}>
                            <Link to={link.path} className={cn(
                                "flex items-center gap-4 text-xl font-light py-3 px-4 rounded-lg transition-colors",
                                location.pathname === link.path ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}>
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
                
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-auto pt-6 border-t space-y-4">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-2">
                          <Avatar className="h-11 w-11">
                            <AvatarFallback className="bg-primary/80 text-primary-foreground text-lg">{user.email?.[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm truncate">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Welcome back!</p>
                          </div>
                      </div>
                      {(isSuperadmin || isFather) ? (<Button variant="outline" className="w-full h-11" onClick={() => navigate('/admin')}>Admin Panel</Button>) : (<Button variant="outline" className="w-full h-11" onClick={() => navigate('/dashboard')}>My Dashboard</Button>)}
                      <Button variant="destructive" className="w-full h-11" onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Button onClick={() => navigate('/login')} variant="outline" className="h-11">Login</Button>
                      <Button onClick={() => navigate('/signup')} className="h-11">Sign Up</Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}