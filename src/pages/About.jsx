import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Ensure Link is imported for navigation
// import { Dialog, DialogPanel } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';
import { FaLightbulb, FaSmile, FaHandshake, FaShieldAlt, FaRocket, FaGlobe } from 'react-icons/fa';
import Header from "../components/Header"
import BackToTop from '../components/BackToTop';
import "../index.css"



// ABOUT IMAGE CONFIGURATION
const ABOUT_IMAGE_CONFIG = {
  teamImage: "/pic2.jpg", // Image for the existing 'Our Story' section
  missionBackground: "/pic4.jpg",
  valuesSectionImage: "/pic.jpg",
};

// IMAGE CONFIGURATION for logos in the header of the About page
const IMAGE_CONFIG = {
  companyLogo: "/Logo.jpg", // Kiddo logo
  mobileLogo: "/Logo.jpg", // Kiddo logo for mobile dialog
};

// Navigation links for the header on the About page - UPDATED WITH ROUTES
// const navigation = [
//   { name: 'Home', href: '/' }, // Link back to home
//   { name: 'Learning Buddies', href: '/learning-buddies' }, // New route
//   { name: 'Pricing', href: '/pricing' }, // New route
//   { name: 'Our Track Record', href: '/our-track-record' }, // New route
// ];

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


export default function About() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Framer Motion variants for buttons
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Stats Data for the "Our Mission" section - UPDATED
  const missionStatsData = [
    { name: 'Active Young Learners', value: 100, suffix: '+' },
    { name: 'Fun Learning Activities', value: 500, suffix: '+' },
    { name: 'Skills Mastered', value: 79.0, suffix: '%', decimalPlaces: 1 },
    { name: 'Global Impact Countries', value: 2 , suffix: '+' }, // Added new stat
  ];

  // Data for "Our Values" section - UPDATED with icons
  const valuesData = [
    {
      title: 'Curiosity First',
      description: 'We foster a natural sense of wonder and encourage children to ask "why" and "how" about the world around them.',
      icon: FaLightbulb,
    },
    {
      title: 'Playful Learning',
      description: 'Education should be an exciting game, not a chore. We integrate fun into every lesson and activity.',
      icon: FaSmile,
    },
    {
      title: 'Empowerment',
      description: 'We empower children to believe in their abilities, take on new challenges, and grow confidently.',
      icon: FaHandshake,
    },
    {
      title: 'Safety & Trust',
      description: 'A secure, positive, and ad-free environment is paramount for effective and worry-free learning.',
      icon: FaShieldAlt,
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve our platform with the latest educational research and engaging technologies.',
      icon: FaRocket,
    },
    {
      title: 'Global Community',
      description: 'We connect young learners from diverse backgrounds, fostering empathy and cultural understanding.',
      icon: FaGlobe,
    },
  ];

  // Placeholder for partner logos (replace with actual paths as needed)
  const partnerLogos = [
    "https://placehold.co/150x50/333333/FFFFFF?text=Partner1",
    "https://placehold.co/150x50/444444/FFFFFF?text=Partner2",
    "https://placehold.co/150x50/555555/FFFFFF?text=Partner3",
    "https://placehold.co/150x50/666666/FFFFFF?text=Partner4",
    "https://placehold.co/150x50/777777/FFFFFF?text=Partner5",
  ];


  return (
    <div className="bg-gray-900 min-h-screen font-rob overflow-x-hidden">
      <Header/>

      {/* About Us Section Content - Our Story */}
      <section className="bg-gray-900 py-16 sm:py-24 lg:py-32 font-rob text-gray-200 min-h-screen flex items-center">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-20 items-center">
            {/* Left Column: Text Content and Buttons */}
            <div className="text-center lg:text-left">
              <motion.h2
                className="text-4xl font-bold tracking-tight text-cyan-400 sm:text-6xl drop-shadow-md"
                variants={textVariants}
              >
                Our Story: Inspiring Young Minds, Building Bright Futures!
              </motion.h2>
              <motion.p
                className="mt-6 text-lg leading-8 text-lime-400"
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                At Kiddo Skills, we are a passionate team dedicated to making learning an enchanting adventure for every child. We believe in nurturing creativity, critical thinking, and a lifelong love for discovery through interactive experiences and engaging content.
              </motion.p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                {/* Updated href for Meet Our Educators button */}
                <motion.a
                  href="/team"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  variants={buttonVariants}
                  transition={{ delay: 0.4 }}
                >
                  Meet Our Educators
                </motion.a>
                <motion.a
                  href="/mission"
                  className="text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  variants={buttonVariants}
                  transition={{ delay: 0.6 }}
                >
                  Our Mission <span aria-hidden="true">→</span>
                </motion.a>
              </div>
            </div>

            {/* Right Column: Image */}
            <motion.div
              className="relative w-full h-80 sm:h-96 lg:h-full rounded-3xl overflow-hidden shadow-xl border-4 border-blue-500"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={ABOUT_IMAGE_CONFIG.teamImage}
                alt="Kiddo Skills Team"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: Our Mission and Statistics with Animated Count-Up and Grid Cards */}
      <section
        className="relative py-16 sm:py-24 lg:py-32 font-rob text-gray-200 bg-cover bg-center"
        style={{ backgroundImage: `url(${ABOUT_IMAGE_CONFIG.missionBackground})` }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-20 items-center">
            {/* Left Column: Mission Statement */}
            <div className="text-center lg:text-left">
              <motion.h2
                className="text-4xl font-bold tracking-tight text-pink-400 sm:text-6xl drop-shadow-md"
                variants={textVariants}
              >
                Our Global Mission: Empowering Little Learners!
              </motion.h2>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-300"
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                At Kiddo Skills, our mission is to create a vibrant, accessible, and safe learning platform where children globally can ignite their curiosity, build essential skills, and discover their unique talents. We're committed to fostering a love for learning that lasts a lifetime.
              </motion.p>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-300"
                variants={textVariants}
                transition={{ delay: 0.3 }}
              >
                Through innovative educational games and personalized learning paths, we aim to make high-quality, engaging education available to every child, preparing them for a future filled with wonder and success.
              </motion.p>
            </div>

            {/* Right Column: Statistics Grid Cards - Updated for better responsiveness on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {missionStatsData.map((stat) => (
                <StatItem key={stat.name} stat={stat} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: Our Values */}
      <section className="bg-gray-900 py-16 sm:py-24 lg:py-32 font-rob text-gray-200">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h2
              className="text-4xl font-bold tracking-tight text-cyan-400 sm:text-5xl drop-shadow-md"
              variants={textVariants}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-lime-400"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              These principles guide everything we do at Kiddo Skills, ensuring a nurturing and effective learning environment for your child.
            </motion.p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-y-16">
              {valuesData.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="relative pl-16 p-4 bg-gray-800/60 rounded-lg shadow-md border border-purple-500/50"
                  initial="hidden"
                  whileInView="visible"
                  variants={textVariants}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <dt className="text-base font-semibold leading-7 text-yellow-400">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg">
                      <value.icon aria-hidden="true" className="size-6" />
                    </div>
                    {value.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">{value.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: Trusted by the world's most innovative teams */}
      <section className="bg-gray-950 py-16 sm:py-24 font-rob text-gray-200">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h2
              className="text-4xl font-bold tracking-tight text-pink-400 sm:text-5xl drop-shadow-md"
              variants={textVariants}
            >
              Trusted by Leading Educational Innovators
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              Our partnerships with top educational institutions and tech companies ensure your child receives the best and most current learning experiences.
            </motion.p>
          </div>

          <div className="mt-16 flex justify-center flex-wrap gap-x-8 gap-y-12 sm:gap-x-12 md:gap-x-16 lg:gap-x-20">
            {partnerLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`Partner Logo ${index + 1}`}
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                transition={{ delay: 0.1 * index + 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </section>
<BackToTop/>
    </div>
  );
}
