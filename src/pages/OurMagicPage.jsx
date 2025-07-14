import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaSmileBeam, FaPalette, FaShieldAlt, FaLightbulb, FaHeart } from 'react-icons/fa'; // Icons for features
import BackToTop from '../components/BackToTop'; // Ensure this path is correct

// Background image for the hero section of this page
const HERO_BACKGROUND_IMAGE = "/hero2.jpg"; // Placeholder image for now

// Data for the "Our Magic" features
const magicFeatures = [
  {
    icon: FaBrain,
    title: 'Brain-Boosting Play',
    description: 'We transform complex concepts into captivating games and challenges that make learning feel effortless and fun.',
  },
  {
    icon: FaSmileBeam,
    title: 'Personalized Journeys',
    description: 'Our adaptive AI and dedicated learning buddies tailor content to each child\'s unique pace and interests, ensuring optimal growth.',
  },
  {
    icon: FaPalette,
    title: 'Unleashing Creativity',
    description: 'Beyond academics, we provide tools and activities that encourage imagination, artistic expression, and innovative thinking.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Nurturing Space',
    description: 'A secure, ad-free, and positive environment where children can explore, experiment, and make mistakes without fear.',
  },
  {
    icon: FaLightbulb,
    title: 'Sparking Curiosity',
    description: 'We ignite a lifelong love for learning by fostering natural curiosity and encouraging exploration of new subjects.',
  },
  {
    icon: FaHeart,
    title: 'Passion-Driven Education',
    description: 'Our team of educators and innovators pours heart and soul into every lesson, ensuring a truly impactful experience.',
  },
];

export default function OurMagicPage() {
  // Framer Motion variants for general section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    // Added pt-20 to push content down from the fixed header.
    // min-h-screen ensures the page takes at least full viewport height.
    <div className="bg-gray-950 min-h-screen font-rob overflow-x-hidden text-gray-200 pt-20">
      {/* Header is omitted here, as it's expected to be rendered globally by App.jsx */}

      {/* Hero Section for Our Magic */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-indigo-900/70 to-purple-800/70">
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="Abstract learning magic background"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/2C3E50/FFFFFF?text=Magic+Background+Missing"; }}
        />
        <div className="absolute inset-0 bg-gray-900/60 -z-10"></div> {/* Dark overlay */}

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-pink-400 sm:text-6xl drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            Unveiling the Magic Behind Kiddo Skills
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            It's not just about lessons; it's about a carefully crafted experience designed to ignite passion, curiosity, and a lifelong love for learning in every child.
          </motion.p>
        </div>
      </section>

      {/* Core Magic Features Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl drop-shadow-md mb-16">
            Our Unique Approach
          </h2>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {magicFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-gray-800/70 rounded-xl shadow-lg border border-teal-600/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                variants={featureCardVariants}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-indigo-500 text-white mb-6 shadow-md">
                  <feature.icon className="size-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-yellow-300 mb-3">{feature.title}</h3>
                <p className="text-base leading-7 text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action or Testimonial Section (Optional, can be expanded) */}
      <section className="bg-gray-950 py-20 sm:py-28 text-center">
        <motion.div
          className="mx-auto max-w-4xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-purple-400 sm:text-5xl drop-shadow-md"
            variants={textVariants}
          >
            Experience the Kiddo Skills Difference
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            Join thousands of families who are already witnessing the transformative power of playful, personalized learning.
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <a
              href="/signup" // Link to your signup page
              className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Start Your Child's Journey
            </a>
          </motion.div>
        </motion.div>
      </section>

      <BackToTop/>
    </div>
  );
}
