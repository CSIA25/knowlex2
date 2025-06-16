import React from 'react';
import Hero from '../components/Hero';
import FeaturedIn from '../components/FeaturedIn';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Mission from '../components/Mission';
import FAQ from '../components/FAQ';
import GlobalScholarshipSection from '../components/GlobalScholarshipSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturedIn />
      <Testimonials />
      <HowItWorks />
      <Features />
      <GlobalScholarshipSection />
      <Mission />
      <FAQ />
      <ContactSection />
    </>
  );
};

export default Index;