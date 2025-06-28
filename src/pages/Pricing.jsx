import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Keep Link for navigation outside header
import { Dialog, DialogPanel } from '@headlessui/react'; // For mobile menu dialog
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // For mobile menu icons
import { CheckIcon } from '@heroicons/react/20/solid'; // For feature list checkmarks
import BackToTopButton from '../components/BackToTopButton'; // Ensure this path is correct

// IMAGE CONFIGURATION for logos and the background illustration
const IMAGE_CONFIG = {
  companyLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo for header
  mobileLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo for mobile dialog
};

// Navigation links (consistent with other pages)
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learning Buddies', href: '/learning-buddies' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Our Track Record', href: '/our-track-record' },
  { name: 'About Us', href: '/about' },
  { name: 'Team', href: '/team' }, // Link to the Team page
];

const pricingTiers = [
  {
    name: 'Beginner Buddy',
    id: 'tier-beginner',
    href: '#',
    price: { monthly: '$19' },
    description: 'Perfect for young explorers starting their learning journey.',
    features: [
      'Access to 100+ interactive lessons',
      'Basic skill-building games',
      'Monthly progress reports',
      'Email support',
      'Ad-free experience',
    ],
    mostPopular: false,
  },
  {
    name: 'Smart Scholar',
    id: 'tier-smart',
    href: '#',
    price: { monthly: '$49' },
    description: 'Unlock advanced learning and personalized growth for your child.',
    features: [
      'Access to all 500+ interactive lessons',
      'Advanced skill-building games & challenges',
      'Weekly personalized learning paths',
      'Priority email & chat support',
      'Exclusive content updates',
      'Parent-teacher virtual meetups',
    ],
    mostPopular: true,
  },
  {
    name: 'Genius Global',
    id: 'tier-genius',
    href: '#',
    price: { monthly: '$99' },
    description: 'The ultimate learning experience with premium support and global insights.',
    features: [
      'All Smart Scholar features',
      '1-on-1 live tutoring sessions (2/month)',
      'Custom learning plan development',
      '24/7 dedicated support',
      'Early access to new features',
      'Global community events',
      'Offline access to select content',
    ],
    mostPopular: false,
  },
];

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  // Framer Motion variants for general section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Framer Motion variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // Framer Motion variants for card elements (staggered)
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-900 min-h-screen font-rob overflow-x-hidden">
      {/* Fixed Header */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open Kiddo menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
              Kiddo Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-gray-900/70" onClick={() => setMobileMenuOpen(false)} />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close Kiddo menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Kiddo Login
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </motion.header>

      {/* Main Content Area (Pricing Section) */}
      <section
        className="relative pt-24 pb-16 sm:pb-24 lg:pb-32 font-rob text-gray-200 block w-full min-h-[calc(100vh-80px)]" /* Added block w-full and min-h */
      >
        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center block w-full" /* Added block w-full */
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-bold tracking-tight text-cyan-400 sm:text-6xl drop-shadow-md"
            variants={textVariants}
          >
            Pricing that grows with your little one's learning
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            Choose an affordable plan that's packed with features for engaging your child, fostering creativity, and building a strong foundation.
          </motion.p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                className="flex flex-col justify-between rounded-3xl bg-gray-800 p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10
                           transform hover:scale-103 hover:shadow-2xl hover:border-purple-400 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.1 * index + 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div>
                  <h3
                    id={tier.id}
                    className="text-base font-semibold leading-7 text-indigo-400"
                  >
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">{tier.price.monthly}</span>
                    <span className="text-base font-semibold leading-7 text-gray-300">/month</span>
                  </div>
                  <p className="mt-6 text-base leading-7 text-gray-300">{tier.description}</p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-lime-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={`mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  ${tier.mostPopular
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                      : 'text-indigo-400 ring-1 ring-inset ring-indigo-400 hover:ring-indigo-300 focus-visible:outline-indigo-400'
                    }`}
                >
                  Get started today
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <BackToTopButton />
    </div>
  );
}
