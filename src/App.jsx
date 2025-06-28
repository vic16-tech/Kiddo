import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import TestimonialsSection from "./components/Testimonials";
import About from "./pages/About";
import FeaturesSection from './components/FeaturesSection.jsx';
import StatsSection from './components/StatSection.jsx';
import Footer from './components/Footer.jsx';
import Pricing from "./pages/Pricing.jsx"
import Team from './components/Team.jsx';
import LearningBuddies from './pages/LearningBuddies.jsx';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/SignupPage.jsx'; // New import for SignupPage
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'; // New import for ForgotPasswordPage

// This component groups all the sections that should appear ONLY on the home page ('/')
const HomePageContent = () => {
  return (
    <>
      <Home /> {/* Your main hero section / initial landing content */}
      <TestimonialsSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
};

// The main App component that handles the top-level routing
export default function App() {
  return (
      <div className="App">
        {/* The <Routes> component determines which content to render based on the URL. */}
        <Routes>
          {/* Route for the Home Page: Renders all the sections grouped in HomePageContent */}
          <Route path="/" element={<HomePageContent />} />
          <Route path='team' element={<Team/>}/>
          <Route path='pricing' element={<Pricing/>}/>
          <Route path='/learning-buddies' element={<LearningBuddies/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* New route for signup */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* New route for forgot password */}
        </Routes>

        {/* The Footer is placed outside <Routes> so it will render on ALL pages, regardless of the route. */}
        <Footer />
      </div>
  );
}
