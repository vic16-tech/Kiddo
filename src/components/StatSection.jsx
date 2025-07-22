import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "../index.css"
// Placeholder for your illustration image
import illustrationImg from "/pic.jpg";

// **** REVISED useCountUp Hook for robust counting and improved formatting ****
const useCountUp = (end, duration = 2000, decimalPlaces = 0) => {
  const [count, setCount] = useState(0); // State for the animated number
  const animationFrameIdRef = useRef(null); // Stores requestAnimationFrame ID for cleanup
  const startTimeRef = useRef(null);       // Stores timestamp when animation started for current cycle

  useEffect(() => {
    // Function to clean up any active animation frame
    const cleanupAnimation = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      startTimeRef.current = null; // Reset start time for a fresh animation next time
    };

    // Start counting from 0 for a fresh animation cycle whenever 'end' or 'duration' changes
    setCount(0);
    startTimeRef.current = performance.now(); // Record the precise start time

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current; // Time elapsed since animation started
      // Calculate progress (clamped between 0 and 1)
      const progress = Math.min(elapsed / duration, 1);

      let currentValue = end * progress; // Interpolate the value

      // Update the state with the current animated value.
      // We'll apply toLocaleString in the return, which handles formatting.
      setCount(currentValue);

      // If animation is not yet complete, request the next frame
      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished: ensure final value is exact and clear animation ID
        setCount(end); // Set to exact final value
        cleanupAnimation(); // Perform cleanup (clear ID, reset start time)
      }
    };

    // Start the animation loop by requesting the very first frame
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup function for useEffect: Ensures animation is cancelled when component unmounts
    // or when dependencies change (and it re-runs).
    return () => {
      cleanupAnimation();
    };
  }, [end, duration, decimalPlaces]); // Dependencies: Ensures hook reacts to changes in these values

  // Return the current animated count, formatted with toLocaleString
  // This will handle thousands separators and decimal places correctly based on locale.
  return count.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    // For integer values, remove decimal formatting if decimalPlaces is 0
    // This handles cases like 15000 being 15,000, not 15,000.00
    // If decimalPlaces is 0, these will effectively be ignored for fraction digits
  });
};

const stats = [
  { name: 'Active Young Learners', value: 100, suffix: '+' },
  { name: 'Fun Learning Activities', value: 500, suffix: '+' },
  { name: 'Skills Mastered', value: 39, suffix: '%' }, // Added decimalPlaces for precise formatting
  { name: 'Hours of Engaged Learning', value: 100, suffix: '+' },
];

// **** New StatItem Component to encapsulate individual stat logic ****
const StatItem = ({ stat }) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Conditionally pass value to useCountUp based on inView
  // This triggers the count-up only when the item is visible
  const animatedCount = useCountUp(
    inView ? stat.value : 0, // Animate to stat.value if inView, else to 0
    2000, // Default duration for each stat animation
    stat.decimalPlaces || 0 // Use decimalPlaces from stat, or 0 if not defined
  );

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      key={stat.name}
      ref={inViewRef} // Attach ref for inView hook to the motion.div
      className="flex flex-col items-center gap-y-3 p-6 bg-gray-800/60 rounded-xl shadow-lg border border-blue-600/50 backdrop-blur-sm"
      variants={statItemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView status
      viewport={{ once: true, amount: 0.5 }} // This is for `motion.div` itself
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


export default function StatsSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32 font-rob text-gray-200">
      {/* Background Illustration */}
      <div className="absolute inset-0 z-0">
        <img
          src={illustrationImg}
          alt="Abstract background illustration"
          className="w-full h-full object-cover opacity-40" // Increased opacity to 40% for better visibility
        />
        {/* Dark bluish-teal gradient overlay on top of the image for consistent theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-teal-900/50"></div>
      </div>

      {/* Main content wrapper with higher z-index */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-base/7 font-semibold text-pink-400 mb-2">Our Track Record</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-cyan-400 sm:text-5xl">
            Trusted by Thousands of Happy Families
          </p>
          <p className="mt-6 text-lg/8 text-lime-400">
            We are dedicated to providing the best learning experience, and our results speak for themselves. Join our growing community of successful young learners.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.name} stat={stat} /> // Render the new StatItem component
          ))}
        </dl>
      </div>
    </section>
  );
}
