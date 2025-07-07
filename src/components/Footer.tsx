import React from 'react';
import { Code, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About KYUCSA', href: '#about' },
    { name: 'Course Notes', href: '#notes' },
    { name: 'Student Projects', href: '#projects' },
    { name: 'Leadership Team', href: '#leadership' },
    { name: 'Events Calendar', href: '#events' },
    { name: 'Video Tutorials', href: '#tutorials' }
  ];

  const resources = [
    { name: 'Academic Resources', href: '#notes' },
    { name: 'Career Guidance', href: '#career' },
    { name: 'Internship Opportunities', href: '#internships' },
    { name: 'Alumni Network', href: '#alumni' },
    { name: 'Tech Community', href: '#community' },
    { name: 'Study Groups', href: '#study-groups' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/kyucsa', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/kyucsa', color: 'hover:text-blue-300' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/kyucsa', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/kyucsa', color: 'hover:text-blue-300' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/kyucsa', color: 'hover:text-gray-300' }
  ];

  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Organization Info */}
          <div className="lg:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="bg-secondary-500 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KYUCSA</h3>
                <p className="text-sm text-blue-100">Computing Students Association</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed text-center md:text-left">
              Empowering computing students at Kyambogo University through academic excellence, 
              professional development, and community building.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                <span className="text-sm text-blue-100">Kyambogo University, Kampala, Uganda</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                <a href="mailto:info@kyucsa.org" className="text-sm text-blue-100 hover:text-white transition-colors">
                  info@kyucsa.org
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center justify-center md:justify-start group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center justify-center md:justify-start group"
                  >
                    <span>{resource.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Follow Us on Our Social Media Handles</h4>
            <p className="text-blue-100 mb-6 text-sm">
              Stay connected with KYUCSA through our social media platforms for the latest updates and announcements.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-primary-600 hover:bg-primary-700 p-3 rounded-lg transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-400 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            
            {/* Copyright */}
            <div className="text-sm text-blue-100">
              <p>© {currentYear} KYUCSA - Kyambogo University Computing Students Association.</p>
              <p className="mt-1">All rights reserved. Developed and Modified by KYUCSA Executives 2025-2026.</p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#privacy" className="text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#support" className="text-blue-100 hover:text-white transition-colors">
                Support
              </a>
              <a href="#accessibility" className="text-blue-100 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;