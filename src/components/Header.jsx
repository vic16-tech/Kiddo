import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// IMAGE CONFIGURATION for logos
const IMAGE_CONFIG = {
  companyLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo
  mobileLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo for mobile dialog
};

// Navigation links for the header
const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Learning Buddies', href: '/learning-buddies' }, // Direct route
  { name: 'Pricing', href: '/pricing' }, // Direct route to pricing page
  { name: 'Our Track Record', href: '/our-track-record' }, // Direct route to stats page
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 bg-gray-950/80 backdrop-blur-sm shadow-sm"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Kiddo Skills</span>
            <img
              alt="Kiddo Skills Logo"
              src={IMAGE_CONFIG.companyLogo}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open Kiddo menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300">
            Kiddo Login <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-950/70" onClick={() => setMobileMenuOpen(false)} />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-700/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Kiddo Skills</span>
              <img
                alt="Kiddo Skills Logo"
                src={IMAGE_CONFIG.mobileLogo}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close Kiddo menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700/50">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-cyan-400 hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-cyan-400 hover:bg-gray-700"
                >
                  Kiddo Login
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
}
