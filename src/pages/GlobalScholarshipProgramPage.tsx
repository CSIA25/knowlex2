import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, GraduationCap, ArrowRight, Compass, TrendingUp, BarChart3, BookOpen, PenTool, Mic, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CountUp } from '@/components/CountUp';
import InquiryWidget from '@/components/InquiryWidget';
import { cn } from '@/lib/utils';

const stats = [
  { name: 'Visa Success Rate', value: 98, suffix: '%' },
  { name: 'Scholarships Secured', value: 500, suffix: '+' },
  { name: 'Destination Countries', value: 30, suffix: '+' },
];

const services = [
    { slug: "student-assessment-profiling", title: "Student Assessment & Profiling", icon: Compass, description: "We start with a deep-dive into your academic and extracurricular profile to identify your unique strengths and align them with global opportunities.", features: ["Academic strength evaluation", "Career goal alignment", "Personalized scholarship matching"], image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop" },
    { slug: "profile-building", title: "Profile Building", icon: TrendingUp, description: "We strategically enhance your profile by recommending impactful extracurriculars, leadership roles, and international competitions to make you a standout candidate.", features: ["Extracurricular planning", "Leadership development", "Portfolio creation assistance"], image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"},
    { slug: "scholarship-roadmap", title: "Scholarship Roadmap", icon: BarChart3, description: "Our experts craft a detailed, step-by-step strategic plan. This roadmap outlines key milestones, from university selection to application deadlines.", features: ["Customized application timeline", "Key milestone tracking", "Priority scholarship identification"], image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop" },
    { slug: "preparation-classes", title: "Preparation Classes", icon: BookOpen, description: "Master required standardized tests and language proficiency exams with our specialized, high-impact preparation classes for English, German, and Japanese.", features: ["Standardized test prep (SAT, ACT)", "IELTS & TOEFL Prep", "German Language Courses (A1-B2)", "Japanese Language Prep (N5-N3)"], image: "https://images.unsplash.com/photo-1523240795610-57171363c9b7?q=80&w=1200&auto=format&fit=crop" },
    { slug: "personal-essay-prep", title: "Personal Essay Prep", icon: PenTool, description: "Our experts guide you to write compelling personal essays and applications that tell your unique story and captivate admissions officers.", features: ["Compelling storytelling", "Structure & outline development", "Grammar & style review"], image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1200&auto=format&fit=crop" },
    { slug: "visa-interview-prep", title: "Visa Interview Prep", icon: Mic, description: "Gain confidence with mock interviews and get comprehensive support for your visa application, ensuring you are fully prepared for the final steps.", features: ["Mock interview sessions", "Documentation preparation", "Scenario-based coaching"], image: "https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=1200&auto=format&fit=crop" },
];


const ServiceSection = ({ service, index }: { service: typeof services[0], index: number }) => {
    const isEven = index % 2 === 0;
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
            <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                 <img src={service.image} alt={service.title} className="rounded-2xl shadow-2xl aspect-[4/3] w-full object-cover" />
            </div>
            <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <service.icon className="w-6 h-6 text-primary"/>
                    </div>
                    <h3 className="text-3xl font-bold font-heading">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                    {service.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-accent flex-shrink-0"/>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                 <Button asChild variant="link" className="p-0 mt-6 text-lg">
                    <Link to={`/services/${service.slug}`}>
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </motion.div>
    )
}

const GlobalScholarshipProgramPage = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="bg-background text-foreground">
            <InquiryWidget />
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-36 pb-24 text-center">
                 <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"/>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#C3E5F4,transparent)]" />
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="container"
                >
                    <motion.div variants={itemVariants} className="inline-block bg-primary/10 p-3 rounded-2xl mb-6">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Global Scholarship Program
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                        An elite, end-to-end support system designed to transform your potential into a global reality. We navigate, you succeed.
                    </motion.p>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-background/50 backdrop-blur-sm p-6 rounded-2xl border">
                                <p className="text-5xl font-bold text-primary">
                                    <CountUp value={stat.value} />
                                    {stat.suffix}
                                </p>
                                <p className="text-muted-foreground mt-1">{stat.name}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-24">
                <div className="container space-y-24">
                    {services.map((service, index) => (
                        <ServiceSection key={service.slug} service={service} index={index} />
                    ))}
                </div>
            </section>
            
            {/* FINAL CTA */}
            <section className="py-24 bg-muted">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Ready to Begin Your Ascent?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Let's build your personalized roadmap to success. Your future on the global stage starts now.
                        </p>
                        <Button size="lg" className="px-10 py-7 text-lg rounded-xl shadow-lg" asChild>
                            <Link to="/contact">
                                Book a Free Consultation <ArrowRight className="ml-2 w-5 h-5"/>
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default GlobalScholarshipProgramPage;