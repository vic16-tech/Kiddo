import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalMessage, setGeneralMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6, ease: "easeOut" } },
  };

  // Basic email validation regex
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralMessage('');
    setEmailError('');
    setIsSubmitting(true);

    let valid = true;

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for password reset
    console.log('Attempting to send reset link to:', email);
    setGeneralMessage('Sending password reset link...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate network delay

      console.log('Password reset link sent successfully!');
      setGeneralMessage('If an account with that email exists, a password reset link has been sent to your inbox.');
      setEmail(''); // Clear email input on success

    } catch (error) {
      console.error('Forgot password request failed:', error);
      setGeneralMessage('Failed to send reset link. Please try again.'); // More specific error in real app
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-rob"> {/* Main container */}
      <Header /> {/* Render the Header component at the top */}
      <motion.div
        className="pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" // Added pt-24 for fixed header offset
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div
          className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg border border-purple-600/50 backdrop-blur-sm text-center"
          variants={formVariants}
        >
          <div>
            <img
              className="mx-auto h-16 w-auto mb-4"
              src="https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO"
              alt="Kiddo Skills"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Forgot Your Kiddo Password?
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {generalMessage && (
              <div className={`text-sm p-3 rounded-md ${generalMessage.includes('sent') || generalMessage.includes('If an account') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} text-center`}>
                {generalMessage}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${emailError ? 'border-red-500' : ''}`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                />
                {emailError && <p className="text-red-400 text-xs text-left mt-1">{emailError}</p>}
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                Log in
              </Link>
            </p>
            <p className="mt-2 text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
