import { ArrowRight, Award, Compass, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Personalized Profiling',
    description: 'We identify your unique strengths to match you with the perfect global opportunities.',
    icon: Compass,
  },
  {
    name: 'Strategic Profile Building',
    description: 'We help you craft a standout profile that captures the attention of top universities.',
    icon: TrendingUp,
  },
  {
    name: 'Expert Guidance',
    description: 'From essay prep to visa interviews, our mentors guide you through every critical step.',
    icon: Award,
  },
]

const GlobalScholarshipSection = () => {
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Premier Service</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The Global Scholarship Program
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            An elite, end-to-end support system designed to transform your potential into a global reality. We provide the roadmap, you achieve the success.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col p-8 rounded-2xl glass-card border border-border/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                     <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
                <Link to="/inquiry">
                    Start Your Scholarship Journey <ArrowRight className="ml-2"/>
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobalScholarshipSection;