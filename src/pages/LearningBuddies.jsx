import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Import icons from lucide-react (ensure you have it installed: npm install lucide-react)
import { Brain, MessageSquareText, Smile, Sparkles, UserCheck, Zap } from 'lucide-react';
import BackToTop from '../components/BackToTop'; // Ensure this path is correct
import Header from "../components/Header"

// Placeholder image for the hero section
const HERO_IMAGE = "/ai.jpg"; // You can replace this with an actual image

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

// --- Features Data ---
const buddyFeatures = [
  {
    icon: Brain,
    title: "Personalized Learning Paths",
    description: "Our AI buddies adapt to your child's pace, strengths, and areas for growth, creating a truly unique learning experience.",
  },
  {
    icon: MessageSquareText,
    title: "Interactive & Engaging Conversations",
    description: "Children can chat, ask questions, and explore topics in a dynamic, conversational style that feels natural and fun.",
  },
  {
    icon: Smile,
    title: "Emotional Support & Encouragement",
    description: "Beyond academics, buddies offer positive reinforcement, celebrate successes, and help navigate learning challenges.",
  },
  {
    icon: Sparkles,
    title: "Spark Creativity & Critical Thinking",
    description: "Buddies encourage imaginative play, open-ended questions, and problem-solving, fostering deeper understanding.",
  },
  {
    icon: UserCheck,
    title: "Safe & Secure Environment",
    description: "Designed with child safety in mind, ensuring a protected space for exploration and interaction.",
  },
  {
    icon: Zap,
    title: "Instant Feedback & Explanations",
    description: "Get immediate insights and clear explanations for concepts, helping children learn from mistakes instantly.",
  },
];

export default function LearningBuddiesPage() {
  return (
    // Main container with background, font, and padding to clear fixed header
    <div className="bg-gray-950 min-h-screen font-rob overflow-x-hidden text-gray-200 pt-20">
          <Header/>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Background Image for Hero Section */}
        <img
          src={HERO_IMAGE}
          alt="Child interacting with an AI buddy on a tablet"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/2C3E50/FFFFFF?text=Buddies+Hero+Missing"; }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-indigo-800/70 -z-10"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-yellow-300 sm:text-6xl drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            Meet Your AI Learning Buddies!
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Experience the future of personalized education with companions designed to make learning fun, interactive, and truly adaptive.
          </motion.p>
        </div>
      </section>

      {/* What Are Learning Buddies Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl drop-shadow-md mb-16">
            Your Personalized Learning Companions
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2 flex justify-center items-center"
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              transition={{ delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img
                src="/ai.jpg"
                alt="Illustration of a child interacting with an AI buddy"
                className="rounded-2xl shadow-xl border border-indigo-600/50"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/6D28D9/FFFFFF?text=Buddy+Image+Missing"; }}
              />
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ delay: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="text-lg leading-8 text-gray-300 mb-6">
                Kiddo Skills' AI Learning Buddies are more than just digital tutors; they are intelligent, adaptive companions designed to make learning a truly personal and joyful experience for every child. They understand individual learning styles, adapt to progress, and provide support exactly when and where it's needed.
              </p>
              <p className="text-lg leading-8 text-gray-300">
                Imagine a friend who's always there to help with homework, explain complex concepts in simple terms, or even just encourage and celebrate small victories. Our buddies are built to foster curiosity, build confidence, and ensure that learning is always an exciting adventure.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-950 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-pink-400 sm:text-4xl drop-shadow-md mb-16">
            How Your Buddy Helps You Grow
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {buddyFeatures.map((feature, index) => (
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
                  <feature.icon size={48} strokeWidth={1.5} /> {/* Lucide icon component */}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 py-20 sm:py-24">
        <motion.div
          className="mx-auto max-w-4xl px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-yellow-300 sm:text-4xl drop-shadow-md mb-6">
            Ready to Meet Your Buddy?
          </h2>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            Unlock personalized learning and make every study session an exciting adventure with your new AI companion.
          </p>
          <motion.a
            href="/signup" // Link to your signup page or a specific "Try Buddy" page
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                       shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Free Trial
          </motion.a>
        </motion.div>
      </section>

      <BackToTop/>
    </div>
  );
}
