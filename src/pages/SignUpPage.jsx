import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component

export default function SignupPage() {
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
    <div className="bg-gray-900 min-h-screen font-rob"> {/* Main container, no padding top here */}
      <Header /> {/* Render the Header component at the top */}
      <motion.div
        className="pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" // Added pt-24 for fixed header offset
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div
          className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg border border-pink-600/50 backdrop-blur-sm text-center"
          variants={formVariants}
        >
          <div>
            <img
              className="mx-auto h-16 w-auto mb-4"
              src="https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO"
              alt="Kiddo Skills"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Create Your Kiddo Account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Start your learning adventure today!
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
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${usernameError ? 'border-red-500' : ''}`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError('');
                  }}
                />
                {usernameError && <p className="text-red-400 text-xs text-left mt-1">{usernameError}</p>}
              </div>
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
                  className={`appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${passwordError ? 'border-red-500' : ''}`}
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
                  className={`appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                             ${confirmPasswordError ? 'border-red-500' : ''}`}
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
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
