import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import social media icons
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import BackToTop from '../components/BackToTop'; // Corrected import path and name
import team from "/team.jpg"; // Background image for the Team page

// IMAGE CONFIGURATION for logos in the header of the Team page
const IMAGE_CONFIG = {
  companyLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo
  mobileLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO", // Kiddo logo for mobile dialog
};

// Navigation links for the header
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learning Buddies', href: '/learning-buddies' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Our Track Record', href: '/our-track-record' },
  { name: 'About Us', href: '/about' },
];

const people = [
  {
    name: 'Victor Achede',
    role: 'Chief Executive Officer & Founder, Kiddos',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=VA',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
      { type: 'facebook', href: '#', icon: FaFacebookF },
    ],
  },
  {
    name: 'Achede Godwin',
    role: 'Director Of Operations, Kiddos',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=AG',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
      { type: 'facebook', href: '#', icon: FaFacebookF },
    ],
  },
  {
    name: 'Dries Vincent',
    role: 'Head of Product Development',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=DV',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Lindsay Walton',
    role: 'Lead Curriculum Designer',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=LW',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
    ],
  },
  {
    name: 'Tom Cook',
    role: 'Chief Operations Officer',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=TC',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Courtney Henry',
    role: 'VP of Marketing & Outreach',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=CH',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
      { type: 'facebook', href: '#', icon: FaFacebookF },
    ],
  },
  {
    name: 'Whitney Francis',
    role: 'Senior Software Engineer',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=WF',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Leonard Krasner',
    role: 'Educational Content Specialist',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=LK',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
    ],
  },
  {
    name: 'Floyd Miles',
    role: 'User Experience Lead',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=FM',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Jenny Wilson',
    role: 'Community Engagement Manager',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=JW',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
      { type: 'facebook', href: '#', icon: FaFacebookF },
    ],
  },
  {
    name: 'Kristin Watson',
    role: 'AI Learning Specialist',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=KW',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Guy Hawkins',
    role: 'Data Scientist',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=GH',
    socials: [
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Eleanor Pena',
    role: 'Mobile App Developer',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=EP',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
    ],
  },
  {
    name: 'Robert Fox',
    role: 'Customer Success Lead',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=RF',
    socials: [
      { type: 'facebook', href: '#', icon: FaFacebookF },
    ],
  },
  {
    name: 'Jane Cooper',
    role: 'Game Designer',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=JC',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
      { type: 'linkedin', href: '#', icon: FaLinkedinIn },
    ],
  },
  {
    name: 'Wade Warren',
    role: 'Senior Animator',
    imageUrl: 'https://placehold.co/256x256/1E293B/E2E8F0?text=WW',
    socials: [
      { type: 'instagram', href: '#', icon: FaInstagram },
    ],
  },
];

// Fallback image URLs for broken images
const FALLBACK_IMAGE_URL = "https://placehold.co/150x150/6B7280/FFFFFF?text=No+Image";
const BACKGROUND_FALLBACK_URL = "https://placehold.co/1920x1080/4B5563/FFFFFF?text=Background+Not+Found";


export default function TeamPage() { // Renamed from Team to TeamPage for consistency
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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

      {/* Main Team Content with Background Illustration */}
      <div className="relative pt-32 pb-16 sm:pb-24 lg:pb-32 font-rob min-h-screen block w-full"> {/* Added block w-full and pt-32 for offset */}
        {/* Background Illustration Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={team}
            alt="Team Illustration Background"
            className="w-full h-full object-cover opacity-30" // Adjust opacity as needed
            onError={(e) => { e.target.onerror = null; e.target.src = BACKGROUND_FALLBACK_URL; }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gray-900/70"></div> {/* Dark overlay */}
        </div>

        <motion.div
          className="mx-auto grid max-w-7xl gap-y-16 gap-x-8 px-6 lg:px-8 xl:grid-cols-3 relative z-10 block w-full"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-xl text-center xl:text-left">
            <motion.h2
              className="text-3xl font-semibold tracking-tight text-cyan-400 sm:text-4xl drop-shadow-md"
              variants={textVariants}
            >
              Meet Our Dedicated Team
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              We’re a dynamic group of individuals who are passionate about making learning engaging and accessible. Each member brings unique expertise and a shared commitment to fostering young minds.
            </motion.p>
          </div>
          <ul role="list" className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-2 xl:col-span-2">
            {people.map((person, index) => (
              <motion.li
                key={person.name}
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                transition={{ delay: 0.1 * index + 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-x-6 p-4 bg-gray-800/60 rounded-xl shadow-md border border-indigo-600/50 text-center sm:text-left backdrop-blur-sm">
                  <img
                    alt={person.name}
                    src={person.imageUrl}
                    className="size-16 rounded-full object-cover border-2 border-yellow-400 mb-4 sm:mb-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE_URL; }}
                  />
                  <div className="flex flex-col items-center sm:items-start">
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-white">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-400">{person.role}</p>
                    {/* Social Media Links */}
                    {person.socials && person.socials.length > 0 && (
                      <div className="flex mt-3 space-x-3">
                        {person.socials.map((social) => (
                          <a
                            key={social.type}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                          >
                            <span className="sr-only">{social.type}</span>
                            <social.icon className="h-5 w-5" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <BackToTop/>
    </div>
  );
}
