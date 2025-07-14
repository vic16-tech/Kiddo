import React from 'react';
// Import social media icons from react-icons/fa
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for internal navigation

export default function Footer() {
  const solutionsLinks = [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ];

  const supportLinks = [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ];

  const companyLinks = [
    { name: 'About', href: '/about' }, // Link to About Us page
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ];

  const legalLinks = [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: '#' },
    { name: 'Instagram', icon: FaInstagram, href: '#' },
    { name: 'X', icon: FaTwitter, href: '#' }, // Using FaTwitter for X
    { name: 'GitHub', icon: FaGithub, href: '#' },
    { name: 'YouTube', icon: FaYoutube, href: '#' }, // Assuming YouTube for the last icon
  ];

  const LOGO_FALLBACK_URL = "/Logo.jpg";

  return (
    // Main footer container with dark background and padding
    <footer className="bg-gray-950 text-gray-400 py-12 sm:py-16 lg:py-20 font-rob">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid for footer columns */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-12">

          {/* Column 1: Logo, Description, Social Media */}
          <div className="col-span-full lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
            {/* Logo image */}
            <Link to="/" className="mb-6">
              <img
                src="/Logo.jpg" // Path to your logo image in the public folder
                alt="Kiddo Skills Logo"
                className="h-10 w-auto mx-auto lg:mx-0 rounded-md" // Added rounded-md for consistency
                onError={(e) => { e.target.onerror = null; e.target.src = LOGO_FALLBACK_URL; }}
              />
            </Link>
            {/* Company description */}
            <p className="max-w-xs text-sm leading-6 mb-6">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            {/* Social media icons */}
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white mb-4">Solutions</h3>
            <ul role="list" className="space-y-3">
              {solutionsLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul role="list" className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul role="list" className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul role="list" className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs leading-5">
          <p>&copy; {new Date().getFullYear()} Kiddo, Inc. All rights reserved.</p> {/* Dynamic Year */}
        </div>
      </div>
    </footer>
  );
}
