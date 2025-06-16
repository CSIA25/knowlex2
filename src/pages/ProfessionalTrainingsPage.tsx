import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Check,
  HardHat,
  FileText,
  UserCheck,
  Star,
  Briefcase,
  Globe,
  BrainCircuit,
  Users,
  Award
} from 'lucide-react';

// Define the structure of each training/service item
type TrainingItem = {
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  features: string[];
  countries?: string[]; // Optional
};

// Content
const prLeadingSkillsTrainings: TrainingItem[] = [
  {
    title: "PR Leading Skill Training",
    icon: FileText,
    countries: ["Australia", "Canada", "UK"],
    description: "Develops essential skills for permanent residency applications.",
    features: ["Country-specific policies", "Documentation prep", "Interview prep", "Skills assessment guidance"]
  },
  {
    title: "Hospitality (Cook/Chef)",
    icon: Briefcase,
    countries: ["Australia", "Canada", "UK", "NZ"],
    description: "Professional culinary training for international careers.",
    features: ["International cuisine", "Kitchen management", "Food safety certification", "Industry placement"]
  },
  {
    title: "Healthcare Assistant",
    icon: Briefcase,
    countries: ["UK", "Canada", "Australia"],
    description: "Training for healthcare assistant roles with international recognition.",
    features: ["Patient care fundamentals", "Medical terminology", "First aid & emergency", "Clinical placement"]
  },
  {
    title: "Hair Dressing",
    icon: Briefcase,
    countries: ["UK", "Australia", "NZ"],
    description: "Professional hair styling training for international salon careers.",
    features: ["Cutting & styling", "Color theory", "Salon management", "Portfolio development"]
  },
  {
    title: "Beautician Program",
    icon: Star,
    countries: ["UK", "Australia", "Canada"],
    description: "Complete beauty therapy training for international careers.",
    features: ["Skincare treatments", "Makeup application", "Nail care & design", "Business management"]
  }
];

const relatedServices: TrainingItem[] = [
    {
    title: "English Test Preparation",
    icon: UserCheck,
    description: "Comprehensive preparation for IELTS, PTE, and other English proficiency tests.",
    features: ["All modules covered", "Practice tests", "Personalized improvement plans", "Test-taking strategies"]
  },
  {
    title: "Applicant Career Profiling",
    icon: BrainCircuit,
    description: "Comprehensive assessment to identify the best career path and training options.",
    features: ["Skills assessment", "Career goals exploration", "Market demand analysis", "Long-term career planning"]
  },
  {
    title: "Applicant PR Roadmap",
    icon: FileText,
    description: "Personalized permanent residency planning with step-by-step guidance.",
    features: ["Eligibility assessment", "Documentation checklist", "Timeline creation", "Application review"]
  },
  {
    title: "PR Mentorship (One-on-One)",
    icon: UserCheck,
    description: "Dedicated mentoring for your PR journey with personalized guidance.",
    features: ["Weekly sessions", "Customized guidance", "Interview preparation", "Post-landing support"]
  },
];

const internationalTrainings: TrainingItem[] = [
  {
    title: "International Training & Exposure",
    icon: Globe,
    countries: ["UK", "Australia", "Canada", "Singapore", "Malaysia", "Thailand", "UAE"],
    description: "Immersive international programs providing hands-on experience, industry exposure, and global certification to fast-track your career.",
    features: ["Practical industry training", "Global standards certification", "Cultural adaptation workshops", "Cross-cultural networking events"]
  },
  {
    title: "Competency Training Abroad",
    icon: Award,
    countries: ["Australia", "NZ", "Canada", "UK"],
    description: "Specialized skill development programs in international settings with certification.",
    features: ["Industry-specific skills", "International standards", "Hands-on projects", "Employment pathways"]
  }
];

const tabs = [
  { id: 'pr-skills', name: 'PR Leading Skills' },
  { id: 'related', name: 'Related PR Services' },
  { id: 'international', name: 'International Trainings' }
];

const ProfessionalTrainingsPage = () => {
  const [activeTab, setActiveTab] = useState<'pr-skills' | 'related' | 'international'>('pr-skills');

  const activeContent =
    activeTab === 'pr-skills'
      ? prLeadingSkillsTrainings
      : activeTab === 'related'
      ? relatedServices
      : internationalTrainings;

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <HardHat className="w-16 h-16 mx-auto text-primary mb-6" />
          <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Professional Training Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Industry-focused training modules to prepare you for international career opportunities and permanent residency pathways.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-xl bg-muted/50 inline-flex flex-wrap justify-center gap-2">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'pr-skills' | 'related' | 'international')}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className="px-6 py-2.5 rounded-lg"
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activeContent.map((item, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl flex flex-col border border-border/10">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-1">{item.title}</h3>
                {item.countries && (
                  <p className="text-xs text-muted-foreground mb-3">
                    {item.countries.join(' • ')}
                  </p>
                )}
                <p className="text-muted-foreground mb-6 flex-grow">{item.description}</p>
                <ul className="space-y-3 mb-6">
                  {item.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-auto">
                  <Link to="/contact">
                    Inquire Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalTrainingsPage;