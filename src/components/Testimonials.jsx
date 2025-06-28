import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Import quote icons

import "../index.css";

// Testimonial data array
const testimonials = [
  {
    quote: "“Kiddo Skills has transformed how my child approaches learning! The interactive lessons are incredibly engaging, and I've seen a huge boost in their confidence and problem-solving abilities.”",
    author: "Sarah J.",
    title: "Parent & Educator",
    avatar: "https://placehold.co/150x150/8A2BE2/FFFFFF?text=SJ", // Placeholder for avatar
    logo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO+LOGO" // Placeholder for company logo if applicable
  },
  {
    quote: "“My son absolutely loves the coding adventures! He's always excited for his next 'mission.' It's amazing to see him learn complex concepts while having so much fun. Highly recommend!”",
    author: "David M.",
    title: "Happy Dad",
    avatar: "https://placehold.co/150x150/FFD700/000000?text=DM",
    logo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO+LOGO"
  },
  {
    quote: "“As a busy parent, the personalized learning paths are a lifesaver. My daughter is thriving at her own pace, and the progress tracking gives me peace of mind. Truly a fantastic platform.”",
    author: "Emily R.",
    title: "Busy Mom",
    avatar: "https://placehold.co/150x150/32CD32/000000?text=ER",
    logo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO+LOGO"
  }
];

export default function TestimonialsSection() { // Changed component name for clarity
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        (prevIndex + 1) % testimonials.length
      );
    }, 8000); // Change testimonial every 8 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]); // Added dependency to suppress warning

  const currentTestimonial = testimonials[currentTestimonialIndex];

  // Framer Motion variants for the testimonial content
  const testimonialVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } }
  };

  return (
    // Changed main section background to a brighter dark purple/blue
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 px-6 py-24 sm:py-32 lg:px-8 font-rob">
      {/* Background radial gradient adjusted to brighter bluish-purple and increased opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--tw-gradient-stops))] from-blue-600/40 to-purple-600/40 opacity-40"
      />
      {/* Background skewed element adjusted to brighter bluish-purple with increased opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-purple-800/60 shadow-xl ring-1 ring-blue-700/20 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"
      />

      <div className="mx-auto max-w-2xl lg:max-w-4xl z-10 relative">
        <img
          alt="Kiddo Skills Logo"
          src={currentTestimonial.logo} // Dynamic logo if needed, or a static one
          className="mx-auto h-12 mb-8"
        />
        <AnimatePresence mode="wait"> {/* mode="wait" ensures sequential fade */}
          <motion.figure
            key={currentTestimonialIndex} // Key changes to trigger animation for new testimonial
            className="mt-10"
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Adjusted quote text color to cyan-300 */}
            <blockquote className="text-center text-xl/8 font-semibold text-cyan-300 sm:text-2xl/9 relative">
              {/* Adjusted quote icon color to pink-400 */}
              <FaQuoteLeft className="absolute -top-4 left-0 sm:left-4 size-8 sm:size-10 text-pink-400 opacity-80" aria-hidden="true" />
              <p className="mx-auto px-8 sm:px-12">
                {currentTestimonial.quote}
              </p>
              <FaQuoteRight className="absolute -bottom-4 right-0 sm:right-4 size-8 sm:size-10 text-pink-400 opacity-80" aria-hidden="true" />
            </blockquote>
            <figcaption className="mt-10">
              <img
                alt={currentTestimonial.author}
                src={currentTestimonial.avatar}
                className="mx-auto size-16 rounded-full object-cover border-2 border-purple-400" // Adjusted border color to purple-400
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                {/* Adjusted author name color to lime-300 */}
                <div className="font-semibold text-lime-300">{currentTestimonial.author}</div>
                {/* Adjusted dot color to gray-400 for better visibility */}
                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-400">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                {/* Adjusted title color to gray-300 */}
                <div className="text-gray-300">{currentTestimonial.title}</div>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}
