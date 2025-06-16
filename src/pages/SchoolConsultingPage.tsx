import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Briefcase, Award, Globe, Building, BookOpen, Users, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

// Content for Teachers
const teacherServices = [
    { slug: "international-teaching", title: "International Teaching Opportunities", description: "Connects teachers with prestigious schools worldwide to advance their careers globally.", icon: Globe, features: ["Placement in 30+ countries", "Visa & relocation support", "Contract negotiation", "Cultural adaptation training", "Ongoing professional support"] },
    { slug: "teacher-training", title: "Teacher Training & Development", description: "Specialized programs to enhance teaching skills and career advancement.", icon: Award, features: ["IB curriculum training", "Modern teaching methodologies", "Digital classroom techniques", "Leadership development", "Professional certification"] },
    { slug: "educator-fellowship", title: "Overseas Educator Fellowship", description: "An exclusive fellowship program for international exposure and growth.", icon: Briefcase, features: ["3-6 month placements", "Cross-cultural teaching experience", "Research opportunities", "Global educator network", "Publication opportunities"] }
];

// Content for Schools
const schoolServices = [
    { slug: "school-founding", title: "School Founding & Operations", icon: Building, description: "Comprehensive guidance for establishing and operating educational institutions.", features: ["Curriculum development", "Facilities design", "Staff recruitment", "Regulatory compliance", "Financial planning"] },
    { slug: "teacher-outsourcing", title: "Global Teacher Outsourcing", icon: Users, description: "Provides access to qualified international educators.", features: ["Rigorous teacher screening", "Seamless onboarding", "Ongoing professional development", "Performance monitoring", "Replacement guarantees"] },
    { slug: "teacher-support", title: "Comprehensive Teacher Support", icon: Check, description: "Holistic support to maximize teacher effectiveness and satisfaction.", features: ["Professional development", "Mentoring and coaching", "Wellbeing programs", "Career progression planning"]},
    { slug: "remote-educator", title: "Remote Educator Services", icon: Tv, description: "Leverages technology to bring expert educators to any school.", features: ["Virtual teaching specialists", "Hybrid classroom setup", "Digital teaching resources", "Technical support"]},
    { slug: "exchange-programs", title: "International Teacher Exchange", icon: Globe, description: "Facilitates cultural and educational exchanges for teaching staff.", features: ["Bi-directional exchanges", "Cultural immersion", "Global perspective building", "School partnerships"]},
    { slug: "ib-integration", title: "IB Integration & Adoption", icon: BookOpen, description: "Expert guidance for schools transitioning to or enhancing an IB curriculum.", features: ["Implementation roadmap", "Teacher certification", "Curriculum alignment", "Authorization preparation", "Quality management"]}
];

const SchoolConsultingPage = () => {
    const [activeTab, setActiveTab] = useState('teachers');

    return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Briefcase className="w-16 h-16 mx-auto text-primary mb-6" />
          <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">School Consulting Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Elevating educators and institutions with tailored support, global opportunities, and strategic guidance for a new era of education.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
            <div className="p-1.5 rounded-xl bg-muted/50 inline-flex gap-2">
                <Button onClick={() => setActiveTab('teachers')} variant={activeTab === 'teachers' ? 'default' : 'ghost'} className="px-8 py-3 rounded-lg">For Teachers</Button>
                <Button onClick={() => setActiveTab('schools')} variant={activeTab === 'schools' ? 'default' : 'ghost'} className="px-8 py-3 rounded-lg">For Schools</Button>
            </div>
        </div>
        
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                {activeTab === 'teachers' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teacherServices.map(service => (
                            <div key={service.slug} className="glass-card p-8 rounded-2xl flex flex-col border border-border/10">
                                <service.icon className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold font-heading mb-3">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map(f => <li key={f} className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-accent" /> {f}</li>)}
                                </ul>
                                <Button asChild className="mt-auto">
                                    <Link to="/contact">Inquire Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'schools' && (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {schoolServices.map(service => (
                            <div key={service.slug} className="glass-card p-8 rounded-2xl flex flex-col border border-border/10">
                                <service.icon className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold font-heading mb-3">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map(f => <li key={f} className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-accent" /> {f}</li>)}
                                </ul>
                                <Button asChild className="mt-auto">
                                    <Link to="/contact">Inquire Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
    );
};

export default SchoolConsultingPage;