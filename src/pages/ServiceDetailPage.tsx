import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight ,CheckCircle, ChevronRight, Compass, TrendingUp, BarChart3, BookOpen, PenTool, Mic, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const scholarshipServicesData: any = {
    'student-assessment-profiling': {
        title: "Student Assessment & Profiling",
        category: "Global Scholarship Program",
        icon: Compass,
        description: "This foundational step involves a holistic review of your academic achievements, extracurricular activities, and personal ambitions. We use a combination of psychometric testing and expert analysis to create a detailed profile that highlights your unique strengths and identifies areas for development. This profile becomes the blueprint for your entire scholarship journey.",
        features: [
            "In-depth analysis of academic transcripts and achievements.",
            "Standardized aptitude and interest testing.",
            "One-on-one consultation to align career goals with educational paths.",
            "AI-powered matching with a curated database of global scholarships.",
            "A comprehensive report outlining your strengths and opportunities."
        ],
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop"
    },
    'profile-building': {
        title: "Profile Building",
        category: "Global Scholarship Program",
        icon: TrendingUp,
        description: "Beyond grades, top scholarships look for well-rounded individuals. We work with you to strategically build a compelling profile. This includes recommending impactful extracurriculars, identifying leadership opportunities, and guiding you through portfolio development to ensure you stand out from the crowd.",
        features: [
            "Personalized extracurricular activity planning.",
            "Guidance on securing leadership and volunteer roles.",
            "Assistance with creating professional portfolios for creative fields.",
            "Networking strategies and mentorship connections.",
            "Strategies for demonstrating passion and commitment in your chosen field."
        ],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
    },
    'scholarship-roadmap': {
        title: "Scholarship Roadmap",
        category: "Global Scholarship Program",
        icon: BarChart3,
        description: "Navigating the complex landscape of scholarship applications requires a clear plan. We create a customized, time-bound roadmap that breaks down the entire process into manageable steps. This includes identifying priority scholarships, tracking deadlines, and setting milestones to keep you on track.",
        features: [
            "A personalized calendar with all key application deadlines.",
            "A prioritized list of best-fit scholarships and universities.",
            "Access to a digital dashboard for milestone tracking.",
            "Regular progress reviews and strategy adjustments.",
            "Financial aid and budget planning assistance."
        ],
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
    },
    // Adding more dummy data for the rest
    'preparation-classes': {
        title: "Preparation Classes",
        category: "Global Scholarship Program",
        icon: BookOpen,
        description: "Excel in the required standardized tests and language proficiency exams with our targeted preparation classes. Our experienced tutors provide personalized strategies and in-depth content review to help you achieve top scores.",
        features: ["SAT, ACT, GRE, and GMAT preparation.", "IELTS and TOEFL language test coaching.", "Intensive essay writing workshops.", "Small group and one-on-one tutoring options."],
        image: "https://images.unsplash.com/photo-1523240795610-57171363c9b7?q=80&w=1200&auto=format&fit=crop"
    },
    'personal-essay-prep': {
        title: "Personal Essay Prep",
        category: "Global Scholarship Program",
        icon: PenTool,
        description: "Your personal essay is your voice in the application process. We guide you through brainstorming, structuring, and polishing your story to create a compelling narrative that resonates with admissions committees.",
        features: ["Brainstorming sessions to uncover unique story angles.", "Expert guidance on narrative structure and flow.", "Advanced review of grammar, style, and tone.", "Ensuring your essay complements the rest of your application."],
        image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1200&auto=format&fit=crop"
    },
    'visa-interview-prep': {
        title: "Visa Interview Prep",
        category: "Global Scholarship Program",
        icon: Mic,
        description: "Secure your study visa with confidence. Our comprehensive preparation includes mock interviews, documentation review, and coaching on how to effectively answer common and challenging questions from consular officers.",
        features: ["Realistic mock interview simulations.", "Thorough review of all visa application documents.", "Coaching on non-verbal communication and presentation.", "Updates on the latest visa policies and requirements."],
        image: "https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=1200&auto=format&fit=crop"
    },
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = serviceId ? scholarshipServicesData[serviceId] : null;
  const Icon = service?.icon;

  if (!service) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28">
            <h1 className="text-4xl font-bold">Service Not Found</h1>
            <p className="text-muted-foreground mt-4">The service you're looking for doesn't exist or may have been moved.</p>
            <Button onClick={() => navigate(-1)} className="mt-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28">
        <div className="container pb-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                    <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative h-full flex flex-col justify-end p-12 text-white">
                        <p className="font-semibold text-accent">{service.category}</p>
                        <h1 className="text-4xl lg:text-6xl font-bold font-heading mt-2">{service.title}</h1>
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-16 items-start">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold font-heading mb-4">Service Overview</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>

                        <h3 className="text-2xl font-bold font-heading mt-12 mb-6">Key Features</h3>
                        <ul className="space-y-4">
                            {service.features.map((feature: string, index: number) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-lg text-gray-700">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <aside className="lg:sticky top-28 bg-muted/50 p-8 rounded-2xl">
                        <div className="flex justify-center mb-6">
                            {Icon && (
                                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-6 text-center">Ready to Start?</h3>
                        <p className="text-muted-foreground mb-6 text-center">Let's discuss how our {service.title} service can help you achieve your goals.</p>
                        <Button size="lg" className="w-full" asChild>
                            <Link to="/contact">
                                Book a Consultation <ArrowRight className="ml-2 w-5 h-5"/>
                            </Link>
                        </Button>
                    </aside>
                </div>

            </motion.div>
        </div>
    </div>
  );
};

export default ServiceDetailPage;