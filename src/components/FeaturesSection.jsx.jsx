import React from 'react';
import { motion } from 'framer-motion';
import fi from "/fi.jpg"
// Adjusted Heroicons imports to use outline versions suitable for this context
import { AcademicCapIcon, ShieldCheckIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Interactive Lessons',
    description: 'Engaging activities and games designed by experts to make learning enjoyable and effective.',
    icon: AcademicCapIcon, // Icon representing learning/education
  },
  {
    name: 'Safe & Secure Platform',
    description: 'A completely ad-free and moderated environment ensuring your child’s online safety.',
    icon: ShieldCheckIcon, // Icon representing safety/security
  },
  {
    name: 'Personalized Learning Paths',
    description: 'Adaptive challenges and content that grow with your child, tailored to their unique pace.',
    icon: PuzzlePieceIcon, // Icon representing problem-solving or customization
  },
];

export default function FeaturesSection() { // Renamed component for clarity
  // Framer Motion variants for section elements
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="overflow-hidden bg-gray-950 py-24 sm:py-32 font-rob text-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left Column: Text Content and Feature List */}
          <motion.div
            className="lg:pt-4 lg:pr-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Animate when 30% of section is in view
          >
            <div className="lg:max-w-lg">
              {/* Main Heading and Subheading - Adjusted colors */}
              <h2 className="text-base/7 font-semibold text-purple-400">Discover More</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-lime-400 sm:text-5xl">
                A Smarter Way to Learn
              </p>
              <p className="mt-6 text-lg/8 text-cyan-300">
                Our platform is designed to make learning an exciting adventure, combining educational depth with playful engagement. We ensure a supportive environment where every child can flourish.
              </p>
              
              {/* Feature List - Adjusted colors */}
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-200 lg:max-w-none">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="relative pl-9"
                    variants={itemVariants}
                    custom={index} // Pass index for staggered animation if desired
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <dt className="inline font-semibold text-pink-400">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-blue-300" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Right Column: Illustration */}
          <motion.img
            alt="Kids learning illustration"
            src={fi}
            width={1200} // Set intrinsic width for aspect ratio
            height={800} // Set intrinsic height for aspect ratio
            className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-700/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 object-cover" // Ensure it covers and is responsive
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Animate when 50% of image is in view
          />
        </div>
      </div>
    </div>
  );
}
