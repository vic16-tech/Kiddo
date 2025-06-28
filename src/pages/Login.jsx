import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password toggle

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Framer Motion variants for subtle animations
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
    setGeneralError(''); // Clear previous general errors
    setEmailError('');    // Clear previous email errors
    setPasswordError(''); // Clear previous password errors
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

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) { // Example: minimum password length
        setPasswordError('Password must be at least 6 characters.');
        valid = false;
    }

    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call (replace with actual backend integration)
    console.log('Attempting to log in with:', { email, password });
    setGeneralError('Attempting to log in...'); // Provide user feedback

    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful login
      console.log('Login successful!');
      setGeneralError('Login successful! Redirecting...');
      // In a real app, you would handle token, user session, and redirection here
      // Example: history.push('/dashboard');

    } catch (error) {
      console.error('Login failed:', error);
      setGeneralError('Login failed. Please check your credentials.'); // More specific error in real app
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
              src="https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO" // Your Kiddo Skills logo
              alt="Kiddo Skills"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Log in to your Kiddo Account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Continue your learning adventure!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {generalError && (
              <div className={`text-sm p-3 rounded-md ${generalError.includes('successful') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} text-center`}>
                {generalError}
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
                  className={`appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${emailError ? 'border-red-500' : ''}`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(''); // Clear error on change
                  }}
                />
                {emailError && <p className="text-red-400 text-xs text-left mt-1">{emailError}</p>}
              </div>
              <div className="relative"> {/* Added relative positioning for the icon */}
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  // Dynamically change type based on showPassword state
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 pr-10
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${passwordError ? 'border-red-500' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(''); // Clear error on change
                  }}
                />
                {/* Toggle button for password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
                {passwordError && <p className="text-red-400 text-xs text-left mt-1">{passwordError}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to={"/forgot-password"} className="font-medium text-indigo-400 hover:text-indigo-300">
                  Forgot your password?
                </Link>
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
                    Logging In...
                  </span>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
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
