import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Removed: import Header from '../components/Header'; // Header is now handled globally by App.jsx

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback image for the logo if /Logo.jpg is not found
  const LOGO_FALLBACK_URL = "/Logo.jpg";
  // Background image for the page (placeholder for now)
  const BACKGROUND_IMAGE_URL = "/signup1.jpg";


  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6, ease: "easeOut" } },
  };

  // Basic validation functions
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username); // Alphanumeric, underscore, 3-20 chars
  const isValidPassword = (password) => password.length >= 8; // Minimum 8 characters

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear all previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');
    setIsSubmitting(true);

    let valid = true;

    // Validate username
    if (!username.trim()) {
      setUsernameError('Username is required.');
      valid = false;
    } else if (!isValidUsername(username)) {
      setUsernameError('Username must be 3-20 alphanumeric characters or underscores.');
      valid = false;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    console.log('Attempting to sign up with:', { username, email, password });
    setGeneralError('Creating your account...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      // Simulate successful signup
      console.log('Account creation successful!');
      setGeneralError('Account created successfully! Redirecting to login...');
      // In a real app, you would redirect to login page or dashboard
      // Example: navigate('/login');

    } catch (error) {
      console.error('Signup failed:', error);
      setGeneralError('Account creation failed. Please try again.'); // More specific error in real app
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Main container with background image, overlay, and padding to clear fixed header
    <div className="relative bg-gray-950 min-h-screen font-rob overflow-hidden pt-20">
      {/* Background Image */}
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="Kids learning background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        onError={(e) => { e.target.onerror = null; e.target.src = "/signup1.jpg"; }}
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gray-950/70"></div>

      {/* The Header component is now expected to be rendered globally by App.jsx */}

      <motion.div
        className="relative z-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]" // Adjusted min-h for header
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* NEW WRAPPER FOR GLOW EFFECT */}
        <div className="relative max-w-md w-full">
          {/* GLOWING BORDER ELEMENT - positioned absolutely behind the form */}
          {/* -inset-1 makes it slightly larger than the content it wraps, creating the border effect */}
          <div className="absolute -inset-1 rounded-2xl overflow-hidden pointer-events-none z-0">
            {/* The inner div with the conic gradient that will rotate */}
            {/* w-[300%] h-[300%] makes the gradient large enough to rotate smoothly */}
            <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-glow-gradient animate-spin-slow origin-center"></div>
          </div>

          {/* ORIGINAL FORM CARD CONTENT - now without the static border, relying on the glow */}
          <motion.div
            className="relative z-10 w-full space-y-8 p-8 sm:p-10 bg-gray-800/90 rounded-2xl shadow-2xl backdrop-blur-md text-center"
            // Removed: border border-indigo-600/50
            variants={formVariants}
          >
            <div>
              <img
                className="mx-auto h-16 w-auto mb-4 rounded-md"
                src="/Logo.jpg" // Using the specified logo path
                alt="Kiddo Skills"
                onError={(e) => { e.target.onerror = null; e.target.src = LOGO_FALLBACK_URL; }}
              />
              <h2 className="mt-6 text-3xl font-extrabold text-white drop-shadow-md">
                Create Your Kiddo Account
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Start your learning adventure today!
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              {generalError && (
                <div className={`text-sm p-3 rounded-md ${generalError.includes('successful') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} text-center`}>
                  {generalError}
                </div>
              )}
              <div className="rounded-md shadow-sm"> {/* Removed -space-y-px for better spacing */}
                <div className="mb-4"> {/* Added mb-4 for spacing between input groups */}
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700/70
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                ${usernameError ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (usernameError) setUsernameError('');
                    }}
                  />
                  {usernameError && <p className="text-red-400 text-xs text-left mt-1">{usernameError}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700/70
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                ${emailError ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                  />
                  {emailError && <p className="text-red-400 text-xs text-left mt-1">{emailError}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700/70
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                ${passwordError ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                  />
                  {passwordError && <p className="text-red-400 text-xs text-left mt-1">{passwordError}</p>}
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700/70
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                ${confirmPasswordError ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                  />
                  {confirmPasswordError && <p className="text-red-400 text-xs text-left mt-1">{confirmPasswordError}</p>}
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white
                             bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                             shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95
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
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                  Log in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS for the animation and glow gradient */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite; /* 20 seconds, infinite loop */
        }
        .bg-glow-gradient {
          background: conic-gradient(from 0deg, #4F46E5 0%, #EC4899 50%, #4F46E5 100%);
        }
      `}</style>
    </div>
  );
}
