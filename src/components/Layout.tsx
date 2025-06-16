import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";
import { CommandMenu } from "./CommandMenu";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const Layout = () => {
  const [openCommandMenu, setOpenCommandMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparentHeader = isHomePage && !isScrolled;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className={cn(
          "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
          isTransparentHeader ? 'bg-transparent' : 'bg-stone-50/95 backdrop-blur-sm border-b'
      )}>
        <TopBar isTransparent={isTransparentHeader} />
        <Navigation 
          setOpenCommandMenu={setOpenCommandMenu} 
          setOpenMobileMenu={setIsMobileMenuOpen}
          isTransparent={isTransparentHeader} 
        />
      </header>
      <CommandMenu open={openCommandMenu} setOpen={setOpenCommandMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <main className={cn(
        "flex-grow",
        !isHomePage && "pt-28"
      )}>
        <Outlet />
      </main>
      <AnnouncementBanner />
      <Footer />
    </div>
  );
};

export default Layout;