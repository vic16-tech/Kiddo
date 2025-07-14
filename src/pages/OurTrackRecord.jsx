import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react'; // For useCountUp hook
import BackToTop from '../components/BackToTop'; // Using BackToTopButton for consistency
import "../index.css"

// IMAGE CONFIGURATION for the hero background image
const IMAGE_CONFIG = {
  heroBackground: "/track.jpg", // Placeholder image for the hero section
};

// --- Re-usable useCountUp Hook for Stats Section ---
const useCountUp = (end, duration = 2000, decimalPlaces = 0) => {
  const [count, setCount] = useState(0);
  const animationFrameIdRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const cleanupAnimation = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      startTimeRef.current = null;
    };

    setCount(0); // Reset count at the start of each animation cycle
    startTimeRef.current = performance.now(); // Record the start time

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      let currentValue = end * progress;

      if (decimalPlaces > 0) {
        currentValue = parseFloat(currentValue.toFixed(decimalPlaces));
      } else {
        currentValue = Math.round(currentValue);
      }

      setCount(currentValue);

      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it lands on the exact final value
        cleanupAnimation();
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => cleanupAnimation();
  }, [end, duration, decimalPlaces]);

  return count.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};

// --- StatItem Component for Stats Section ---
const StatItem = ({ stat }) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.5,     // Trigger when 50% of the component is in view
  });

  const animatedCount = useCountUp(
    inView ? stat.value : 0, // Animate only when in view
    2000,                    // Duration of animation
    stat.decimalPlaces || 0  // Number of decimal places
  );

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      key={stat.name}
      ref={inViewRef} // Attach ref for intersection observation
      className="flex flex-col items-center gap-y-3 p-6 bg-gray-800/60 rounded-xl shadow-lg border border-blue-600/50 backdrop-blur-sm min-w-0"
      variants={statItemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView status
      viewport={{ once: true, amount: 0.5 }}
    >
      <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">
        <span className="text-yellow-400">
          {animatedCount}
        </span>
        <span className="text-pink-400">{stat.suffix}</span>
      </dd>
    </motion.div>
  );
};


// Data for the Impact Statistics
const impactStats = [
  { name: 'Active Learners Worldwide', value: 200, suffix: '+' },
  { name: 'Interactive Lessons Completed', value: 200, suffix: '+' },
  { name: 'Skills Mastered', value: 67, suffix: '%', decimalPlaces: 1 },
  { name: 'Parent Satisfaction Score', value: 3.5, suffix: '/5', decimalPlaces: 1 },
  { name: 'Countries Reached', value: 3, suffix: '+' },
  { name: 'Hours of Engaged Learning', value: 100, suffix: '+' },
];

// Data for the Milestones Timeline
const milestones = [
  {
    year: '2020',
    title: 'Kiddo Skills Founded',
    description: 'Our journey began with a small team and a big dream: to make learning fun and accessible for every child.',
    image: '/journey.jpg',
  },
  {
    year: '2021',
    title: 'Launch of Core Curriculum',
    description: 'Released our first set of interactive lessons covering foundational skills in math, science, and language arts.',
    image: '/cu.jpg',
  },
  {
    year: '2022',
    title: 'Reached 10,000 Active Users',
    description: 'A significant milestone, demonstrating the growing impact and reach of our platform.',
    image: '/users.jpg',
  },
  {
    year: '2023',
    title: 'Introduced AI Learning Buddies',
    description: 'Revolutionized personalized learning with the integration of AI-powered interactive companions.',
    image: 'ai.jpg',
  },
  {
    year: '2024',
    title: 'Global Expansion to 3+ Countries',
    description: 'Expanded our reach, making Kiddo Skills available to children in new regions worldwide.',
    image: '/world.jpg',
  },
  {
    year: '2025',
    title: 'Partnership with Leading Educational Publishers',
    description: 'Collaborated with top publishers to integrate even more high-quality content into our platform.',
    image: '/team.jpg',
  },
];


export default function OurTrackRecordPage() {
  // Framer Motion variants for general section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    // Corrected pt-30 to pt-20 to ensure proper spacing below the fixed header.
    // min-h-screen ensures the page takes at least full viewport height.
    <div className="bg-gray-950 min-h-screen font-rob overflow-x-hidden text-gray-200 pt-20">
      {/* Header is omitted here, as it's expected to be rendered globally by App.jsx */}

      {/* Hero Section for Track Record */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Background Image for Hero Section */}
        <img
          src={IMAGE_CONFIG.heroBackground}
          alt="Abstract background representing progress and achievement"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" // Adjust opacity as needed
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/2C3E50/FFFFFF?text=Hero+Background+Missing"; }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-indigo-800/70 -z-10"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-yellow-300 sm:text-6xl drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            Our Track Record of Excellence
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Witness the impact of Kiddo Skills through our journey of growth, innovation, and unwavering commitment to nurturing young minds.
          </motion.p>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl drop-shadow-md mb-16">
            Key Achievements & Impact
          </h2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {impactStats.map((stat) => (
              <StatItem key={stat.name} stat={stat} />
            ))}
          </dl>
        </motion.div>
      </section>

      {/* Milestones Timeline Section */}
      <section className="bg-gray-950 py-24 sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-3xl font-bold tracking-tight text-pink-400 sm:text-4xl drop-shadow-md mb-16">
            Our Journey: Key Milestones
          </h2>
          {/* The main timeline wrapper - relative positioning for children */}
          <div className="timeline-container relative overflow-hidden p-10">
            {/* Central vertical line for the timeline */}
            <div className="timeline-line absolute h-full" style={{ left: '50%' }}></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                // Apply 'timeline-item' and 'left-aligned' or 'right-aligned'
                className={`timeline-item ${index % 2 === 0 ? 'right-aligned' : 'left-aligned'}`}
                initial="hidden"
                whileInView="visible"
                variants={timelineItemVariants}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Timeline circle */}
                <div className="timeline-circle z-20 flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 shadow-xl w-10 h-10 rounded-full">
                  <h1 className="mx-auto font-semibold text-base text-white">{milestone.year}</h1>
                </div>
                {/* Timeline content box */}
                <div className="timeline-content bg-gray-800 rounded-lg shadow-xl px-6 py-4 border border-blue-700/50">
                  <h3 className="mb-3 font-bold text-xl text-yellow-300">{milestone.title}</h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">{milestone.description}</p>
                  {milestone.image && (
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="mt-4 rounded-md object-cover w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/6B7280/FFFFFF?text=Image+Missing"; }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <BackToTop/>
    </div>
  );
}
