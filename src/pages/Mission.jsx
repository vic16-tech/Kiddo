import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Heart, Lightbulb, Users, Handshake, BookOpen } from 'lucide-react';
import BackToTop from '../components/BackToTop'; 

// Image configuration for the hero background image
const IMAGE_CONFIG = {
  heroBackground: "/mission.jpg", // Placeholder image for the hero section
};

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Values Data ---
const coreValues = [
  {
    icon: Target,
    title: "Child-Centric Learning",
    description: "Every decision is made with the child's unique needs and potential at its core, fostering natural curiosity.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Creativity",
    description: "We constantly explore new methods and technologies to make learning engaging, imaginative, and effective.",
  },
  {
    icon: Heart,
    title: "Joyful Discovery",
    description: "Learning should be an adventure filled with wonder and excitement, sparking a lifelong love for knowledge.",
  },
  {
    icon: Users,
    title: "Inclusivity & Accessibility",
    description: "We strive to make quality education available to all children, regardless of background or ability.",
  },
  {
    icon: Handshake,
    title: "Community & Collaboration",
    description: "Building a supportive ecosystem where children, parents, and educators can learn and grow together.",
  },
  {
    icon: BookOpen,
    title: "Continuous Growth",
    description: "Embracing a mindset of ongoing improvement, for our platform, our team, and our learners.",
  },
];

export default function MissionPage() {
  return (
    // Main container with background, font, and padding to clear fixed header
    <div className="bg-gray-950 min-h-screen font-rob overflow-x-hidden text-gray-200 pt-20">
      {/* Header is omitted here, as it's expected to be rendered globally by App.jsx */}

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Background Image for Hero Section */}
        <img
          src={IMAGE_CONFIG.heroBackground}
          alt="Kids learning and playing"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/2C3E50/FFFFFF?text=Mission+Background+Missing"; }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-800/70 -z-10"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-yellow-300 sm:text-6xl drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            Our Mission & Vision
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Empowering the next generation with the skills, curiosity, and confidence to thrive in a rapidly changing world.
          </motion.p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl drop-shadow-md mb-16">
            Our Guiding Principle
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="text-lg leading-8 text-gray-300 mb-6">
                At Kiddo Skills, our vision is a world where every child has access to engaging, personalized, and effective learning experiences that ignite their innate curiosity and prepare them for a future filled with possibilities. We believe that education should be a joyful journey of discovery, not just a rote memorization of facts.
              </p>
              <p className="text-lg leading-8 text-gray-300">
                We are committed to building a platform that adapts to each child's unique pace and style, fostering critical thinking, creativity, and problem-solving skills. Our goal is to cultivate a lifelong love for learning, empowering children to become confident, capable, and compassionate individuals.
              </p>
            </motion.div>
            <motion.div
              className="lg:w-1/2 flex justify-center items-center"
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              transition={{ delay: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img
                src="/mission.jpg"
                alt="Vision illustration"
                className="rounded-2xl shadow-xl border border-indigo-600/50"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/4F46E5/FFFFFF?text=Vision+Image+Missing"; }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-950 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-pink-400 sm:text-4xl drop-shadow-md mb-16">
            Values That Drive Us
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-8 bg-gray-800/60 rounded-2xl shadow-lg border border-purple-600/50 backdrop-blur-sm text-center transform hover:scale-105 transition-transform duration-300"
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="mb-4 text-indigo-400">
                  <value.icon size={48} strokeWidth={1.5} /> {/* Lucide icon component */}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section (Optional, but good for flow) */}
      <section className="bg-gray-900 py-20 sm:py-24">
        <motion.div
          className="mx-auto max-w-4xl px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-yellow-300 sm:text-4xl drop-shadow-md mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            Be a part of a community dedicated to shaping brighter futures through innovative education.
          </p>
          <motion.a
            href="/signup" // Link to your signup page
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                       shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Learning Today!
          </motion.a>
        </motion.div>
      </section>

      <BackToTop/>
    </div>
  );
}
