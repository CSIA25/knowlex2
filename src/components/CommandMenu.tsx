import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Phone,
  Sparkles,
  GraduationCap,
  HardHat,
  School,
  PenTool,
  Mic,
  BarChart3,
  Compass,
  Calendar
} from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'All Services', path: '/services', icon: Sparkles },
  { name: 'Media Hub', path: '/media', icon: Sparkles },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Contact Us', path: '/contact', icon: Phone },
];

const serviceLinks = [
  { name: 'Global Scholarship Program', path: '/services/global-scholarship-program', icon: GraduationCap },
  { name: "School Consulting Services", path: '/services/school-consulting', icon: School },
  { name: "Professional Trainings", path: '/services/professional-trainings', icon: HardHat },
  { name: 'Student Assessment', path: '/services/student-assessment-profiling', icon: Compass },
  { name: 'Scholarship Roadmap', path: '/services/scholarship-roadmap', icon: BarChart3 },
  { name: 'Personal Essay Prep', path: '/services/personal-essay-prep', icon: PenTool },
  { name: 'Visa Interview Prep', path: '/services/visa-interview-prep', icon: Mic },
  { name: 'International Teaching', path: '/services/school-consulting', icon: Briefcase },
];


export function CommandMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Key Services">
          {serviceLinks.map((link) => (
            <CommandItem
              key={link.path + link.name}
              onSelect={() => runCommand(() => navigate(link.path))}
            >
              <link.icon className="mr-2 h-4 w-4" />
              <span>{link.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          {navLinks.map((link) => (
            <CommandItem
              key={link.path}
              onSelect={() => runCommand(() => navigate(link.path))}
            >
              <link.icon className="mr-2 h-4 w-4" />
              <span>{link.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}