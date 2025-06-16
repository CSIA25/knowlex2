import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, HardHat } from 'lucide-react';

const serviceCategories = [
  {
    title: 'Global Scholarship Program',
    description: 'Expert guidance for students seeking global scholarships. From assessment and profile building to exam preparation and visa interview training, we help students achieve their international education dreams.',
    link: '/services/global-scholarship-program',
    icon: GraduationCap,
    bgClass: 'from-blue-500/10 to-blue-500/0',
  },
  {
    title: 'School Consulting Services',
    description: 'Comprehensive consulting for teachers and schools, including international teaching opportunities, school founding, teacher outsourcing, and IB integration. Elevate your educational institution with our expertise.',
    link: '/services/school-consulting',
    icon: Briefcase,
    bgClass: 'from-green-500/10 to-green-500/0',
  },
  {
    title: 'Professional Trainings',
    description: 'Specialized training programs for various professions including hospitality, healthcare, and PR services. Prepare for international career opportunities with our industry-focused training modules.',
    link: '/services/professional-trainings',
    icon: HardHat,
    bgClass: 'from-purple-500/10 to-purple-500/0',
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Tailored pathways to global success for students, educators, and institutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl p-8 flex flex-col glass-card bg-gradient-to-br ${service.bgClass}`}
            >
              <div className="flex-shrink-0 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">{service.title}</h2>
              <p className="text-muted-foreground mb-8 flex-grow">{service.description}</p>
              <Link to={service.link} className="mt-auto">
                <span className="font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;