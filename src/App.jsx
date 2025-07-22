import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the global Header component
import Header from './components/Header'; // Assuming Header.jsx is in your components folder

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
import SignUp from './pages/SignUpPage.jsx';
import Settings from './pages/Settings.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import OurTrackRecordPage from './pages/OurTrackRecord.jsx';
import OurMagicPage from './pages/OurMagicPage.jsx';
import Mission from "./pages/Mission.jsx"
import "./index.css"

// This component groups all the sections that should appear ONLY on the home page ('/')
const HomePageContent = () => {
  return (
    <>
      {/* Home will contain the hero section and other landing page content */}
      <Home />
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
        {/* The global Header component will now render on every page. */}
        <Header />

        {/* The <Routes> component determines which content to render based on the URL. */}
        <Routes>
          {/* Route for the Home Page: Renders all the sections grouped in HomePageContent */}
          <Route path="/" element={<HomePageContent />} />
          <Route path='/team' element={<Team/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/learning-buddies' element={<LearningBuddies/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/track-record" element={<OurTrackRecordPage />} />
          <Route path="/our-magic" element={<OurMagicPage />} />
          <Route path="/mission" element={<Mission/>} />
           <Route path="/settings" element={<Settings/>} />
        </Routes>

        {/* The Footer is placed outside <Routes> so it will render on ALL pages, regardless of the route. */}
        <Footer />
      </div>
  );
}
