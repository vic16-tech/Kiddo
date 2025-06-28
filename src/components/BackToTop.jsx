import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa'; // Import the arrow up icon

export default function BackToTop() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Effect to handle scroll event for back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px down
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Function to scroll smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Enables smooth scroll animation
    });
  };

  return (
    // AnimatePresence allows the button to animate out when it's hidden
    <AnimatePresence>
      {showScrollButton && (
        <motion.button
          onClick={scrollToTop}
          // Fixed positioning to stay in view, z-index to ensure it's on top
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg
                     hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 z-40"
          initial={{ opacity: 0, y: 20 }} // Start hidden below and transparent
          animate={{ opacity: 1, y: 0 }}    // Animate to visible and original position
          exit={{ opacity: 0, y: 20 }}     // Animate out (fade and move down) when no longer needed
          transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition for entry/exit
          aria-label="Scroll to top" // Accessibility label
        >
          <FaArrowUp className="h-6 w-6" aria-hidden="true" /> {/* Arrow icon */}
          <span className="sr-only">Back to top</span> {/* Screen reader only text */}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
