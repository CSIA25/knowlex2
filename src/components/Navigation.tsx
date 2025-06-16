import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Search, Menu } from 'lucide-react';

interface NavigationProps {
  setOpenCommandMenu: (open: boolean) => void;
  setOpenMobileMenu: (open: boolean) => void;
  isTransparent: boolean;
}

const Navigation = ({ setOpenCommandMenu, setOpenMobileMenu, isTransparent }: NavigationProps) => {
  const navigate = useNavigate();

  return (
      <nav className="relative w-full z-50 py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 cursor-pointer">
              <img src="/logo.png" alt="Knowlex Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                 <Button 
                   variant={isTransparent ? 'outline' : 'default'}
                   className={cn(isTransparent && 'text-black border-white hover:bg-white/10 hover:text-white')}
                   onClick={() => navigate('/services/global-scholarship-program')}
                 >
                   Global Scholarship
                 </Button>
                 <Button 
                   variant="outline" 
                   className={cn(isTransparent && 'text-black border-white hover:bg-white/10 hover:text-white')}
                   onClick={() => navigate('/inquiry')}
                 >
                   Inquiry Form
                 </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpenCommandMenu(true)} 
                className={cn('hover:bg-accent/10', isTransparent ? 'text-white hover:text-white hover:bg-white/10' : 'text-foreground')}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpenMobileMenu(true)} 
                className={cn('hover:bg-accent/10', isTransparent ? 'text-white hover:text-white hover:bg-white/10' : 'text-foreground')}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navigation;