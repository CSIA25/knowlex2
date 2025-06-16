import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfoItem = ({ icon: Icon, text, href }: { icon: React.ElementType, text: string, href: string }) => (
  <a href={href} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
    <Icon className="w-5 h-5 flex-shrink-0 text-primary" />
    <span>{text}</span>
  </a>
);

const ContactSection = () => {
  return (
    <section className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: General Inquiries */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-heading text-white">For Membership & Consulting</h2>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              If you're interested in booking a consulting or being a member, please contact via phone or email.
            </p>
            <div className="pt-2">
              <ContactInfoItem icon={Phone} text="+1 (555) 123-4567" href="tel:+15551234567" />
            </div>
          </div>
          
          {/* Column 2: Specific Departments */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading text-white mb-3">For Student Admissions</h3>
              <div className="space-y-2">
                <ContactInfoItem icon={Phone} text="+1 (555) 234-5678" href="tel:+15552345678" />
                <ContactInfoItem icon={Mail} text="admissions@knowlex.com" href="mailto:admissions@knowlex.com" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-heading text-white mb-3">For Partnerships</h3>
              <div className="space-y-2">
                <ContactInfoItem icon={Phone} text="+1 (555) 345-6789" href="tel:+15553456789" />
              </div>
            </div>
          </div>
          
          {/* Column 3: Office Location */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading text-white">Marketing & Sales Office</h3>
             <div className="space-y-2">
                 <ContactInfoItem icon={MapPin} text="123 Education Lane, Global City, 10001, USA" href="#" />
            </div>
            
            <h4 className="text-xl font-heading text-white pt-4 mb-3">Marketing</h4>
             <div className="space-y-2">
                 <ContactInfoItem icon={Mail} text="marketing@knowlex.com" href="mailto:marketing@knowlex.com" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;