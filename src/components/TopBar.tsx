import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  isTransparent: boolean;
}

const TopBar = ({ isTransparent }: TopBarProps) => {
  return (
    <div className={cn("z-50 transition-colors duration-300", isTransparent ? 'text-white' : 'text-gray-600')}>
      <div className="container mx-auto px-6 h-9 flex items-center justify-center sm:justify-end text-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="mailto:info@knowlex.com"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">info@knowlex.com</span>
          </a>
          <div className={cn("border-l h-4", isTransparent ? "border-white/20" : "border-border")}></div>
          <a
            href="tel:+15551234567"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+1 (555) 123-4567</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;