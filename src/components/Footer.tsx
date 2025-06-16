import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Updated footer links with working paths
  const footerLinks = {
    'Platform': [
      { name: 'How It Works', path: '/#how-it-works' },
      { name: 'Features', path: '/#features' },
      { name: 'Success Stories', path: '/#testimonials' },
      { name: 'FAQ', path: '/#faq' },
    ],
    'Services': [
      { name: 'Scholarship Program', path: '/services/global-scholarship-program' },
      { name: 'School Consulting', path: '/services/school-consulting' },
      { name: 'Professional Training', path: '/services/professional-trainings' },
      { name: 'Application Form', path: '/application' },
    ],
    'Company': [
      { name: 'About Us', path: '/#mission' },
      { name: 'Media Hub', path: '/media' },
      { name: 'Events', path: '/events' },
      { name: 'Contact', path: '/contact' },
    ],
    'Support': [
      { name: 'Help Center', path: '/contact' },
      { name: 'Inquiry Form', path: '/inquiry' },
      { name: 'Login', path: '/login' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <img src="/logo.png" alt="Knowlex Logo" className="h-12 w-auto" />
                <span className="text-2xl font-semibold text-glow">Knowlex</span>
              </Link>
              
              <p className="text-muted-foreground font-light mb-6 leading-relaxed">
                Empowering students and professionals worldwide to achieve their educational and career dreams through AI-powered guidance and expert mentorship.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Office</h4>
                <div className="flex items-center gap-3 text-muted-foreground font-light">
                    <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                    <span>Baneshwor, Kathmandu, Nepal</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-medium mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-foreground font-light">
              © {currentYear} KnowledgeExchange. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;