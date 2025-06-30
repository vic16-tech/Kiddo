import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Keep Link for navigation
import { CheckIcon } from '@heroicons/react/20/solid'; // For feature list checkmarks
// Removed: import Header from '../components/Header'; // REMOVED: Header is now provided globally by App.jsx
 import BackToTop from '../components/BackToTop'; // Now handled globally by App.jsx

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
    // The outermost div of the page component.
    // It should define the background and minimum height for the page content.
    // The pt-20 is for the global header. This is applied here to the root of the page content.
    <div className="bg-gray-900 min-h-screen font-rob overflow-x-hidden pt-20">
      {/* The Header component is now expected to be rendered once globally in App.jsx */}

      {/* Main Content Area (Pricing Section)
          pt-24 on this section will further push its content down relative to itself,
          but the overall page content correctly starts below the global header due to pt-20 on the parent div.
          block w-full ensures it takes full width.
          min-h-[calc(100vh-80px)] ensures it takes up at least the remaining viewport height,
          assuming the header is approximately 80px tall. */}
      <section
        className="relative pt-4 pb-16 sm:pb-24 lg:pb-32 font-rob text-gray-200 block w-full min-h-[calc(100vh-80px)]"
        // Adjusted pt-24 to pt-4 as the main pt-20 on the container should be sufficient.
        // You can adjust this further if needed after testing.
      >
        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center block w-full"
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
                  className={`mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2
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
      <BackToTop/>
    </div>
  );
}
