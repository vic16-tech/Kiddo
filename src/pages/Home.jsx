import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import router components
import BackToTop from '../components/BackToTop';

// Tailwind CSS is expected to be correctly linked via "../index.css"
import "../index.css"

const IMAGE_CONFIG = {
  companyLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo
  mobileLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo for mobile dialog
  heroImage1: "/pic.jpg", // Placeholder image 1 for collage
  heroImage2: "/fi.jpg", // Placeholder image 2 for collage
  heroImage3: "/4437833.jpg", // Placeholder image 3 for collage
};


// Navigation links - UPDATED with correct React Router paths
const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Learning Buddies', href: '/learning-buddies' }, // Updated route
  { name: 'Pricing', href: '/pricing' }, // Updated route
  { name: 'Our Track Record', href: '/our-track-record' }, // Updated route
];

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero content data - UPDATED to Kiddo content (static, not rotating)
  const heroMainTitle = "Ignite Curiosity, Build Super Skills!";
  const heroSubtitle = "At Kiddo Skills, we make learning an exciting adventure! Dive into fun games and activities that spark imagination and help your child discover their inner genius.";


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

  // Framer Motion variants for buttons (minimal animation as per last request)
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.9, duration: 0.5, ease: "easeOut" } },
  };

  // Framer Motion variants for image collage items (staggered)
  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const imageContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15, // Stagger children animations by 0.15 seconds
        delayChildren: 0.3,   // Delay the start of children animations by 0.3 seconds
      },
    },
  };


  return (
    <div className="bg-gray-50 min-h-screen font-rob overflow-x-hidden">
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
          {/* Hamburger button: visible on small screens, hidden at lg (1024px) and up */}
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
          {/* Desktop nav links: hidden on small screens, flex at lg (1024px) and up (gap-x-12 for this layout) */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* Updated href for Kiddo Login */}
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
              Kiddo Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
        {/* Mobile menu dialog */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-gray-900/70" onClick={() => setMobileMenuOpen(false)} /> {/* Overlay */}
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
                  {/* Updated href for Kiddo Login in mobile menu */}
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

      {/* Hero Section Content - UPDATED to Kiddo content, static images */}
      <main className="relative isolate pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-20 items-center">
            {/* Left Column: Text Content and Buttons */}
            <div className="text-center lg:text-left">
              {/* "Spark New Discoveries Daily!" Banner */}
              <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-black font-bold ring-1 ring-lime-400/30 hover:ring-lime-400/50">
                  Spark New Discoveries Daily!{' '}
                  <a href="#" className="font-semibold text-fuchsia-400 hover:text-fuchsia-300">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Explore Updates <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>

              <motion.h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {heroMainTitle}
              </motion.h1>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-600"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                {heroSubtitle}
              </motion.p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <motion.a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariants}
                  transition={{ delay: 0.4 }}
                >
                  Start Their Adventure!
                </motion.a>
                <motion.a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariants}
                  transition={{ delay: 0.6 }}
                >
                  Learn About Our Magic <span aria-hidden="true">→</span>
                </motion.a>
              </div>
            </div>

            {/* Right Column: Image Collage */}
            <motion.div
              className="relative aspect-[7/5] rounded-3xl bg-gray-500/10 lg:aspect-[3/2] lg:h-96"
              initial="hidden"
              animate="visible"
              variants={imageContainerVariants}
            >
              <motion.img
                src={IMAGE_CONFIG.heroImage1}
                alt="Image 1"
                className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                variants={imageItemVariants}
              />
              <motion.img
                src={IMAGE_CONFIG.heroImage2}
                alt="Image 2"
                className="absolute left-1/4 top-1/4 h-2/3 w-2/3 object-cover rounded-3xl ring-4 ring-white"
                variants={imageItemVariants}
              />
              <motion.img
                src={IMAGE_CONFIG.heroImage3}
                alt="Image 3"
                className="absolute -bottom-1/4 right-1/4 h-1/2 w-1/2 object-cover rounded-3xl ring-4 ring-white"
                variants={imageItemVariants}
              />
            </motion.div>
          </div>
        </div>
      </main>
      <BackToTop/>
    </div>
  );
}

export default Home;
