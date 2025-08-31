import Navbar from './Navbar';
import Footer from './Footer';
import roomieImage from './assets/roomie.jpeg';
import { ChevronRight, Users, MessageCircle, MapPin, Shield, Utensils, Star, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Smart Matching',
      description: 'Get paired with compatible roommates using our intelligent matching system.',
      highlight: 'AI-Powered'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Instant Messaging',
      description: 'Chat with your matches directly through our secure messaging platform.',
      highlight: 'Real-time'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Food Services',
      description: 'Access shared food services and discounts tailored for students and professionals.',
      highlight: 'Save Money'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Deal Breakers',
      description: 'Set your non-negotiables and find roommates who respect your boundaries.',
      highlight: 'Your Rules'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Location Matching',
      description: 'Find roommates in your preferred neighborhoods with location-based search.',
      highlight: 'Local Focus'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Verified Profiles',
      description: 'All users go through our verification process for safety and authenticity.',
      highlight: 'Trusted'
    }
  ];

  const steps = [
    { step: 'Sign Up', description: 'Create your profile with details about your lifestyle and preferences.' },
    { step: 'Get Matched', description: 'Our algorithm suggests potential roommates based on compatibility.' },
    { step: 'Connect', description: 'Use our messaging system to chat and get to know your matches.' },
    { step: 'Choose Your Roommate', description: 'Decide who you want to live with and finalize arrangements.' }
  ];

  return (
    <div className="home-page">
      <Navbar setCurrentPage={setCurrentPage} currentPage="home" />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="welcome">Welcome to RoomieMatch</h1>
          <p className="subtitle">
            Find your perfect roommate, connect instantly, and make living together easier with our services.
          </p>
          <div className="hero-buttons">
            <button 
              className="signup-btn"
              onClick={() => setCurrentPage('signup')}
            >
              Sign Up
            </button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <img 
              src="/src/assets/roomie.jpeg" 
              alt="Roommates" 
              className="hero-image-actual"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '🏠';
                e.target.parentNode.style.fontSize = '120px';
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">Discover the benefits of finding your perfect roommate with RoomieMatch.</p>
        </div>
        <div className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <div className="feature-icon">{feature.icon}</div>
              {feature.highlight && <span className="feature-highlight">{feature.highlight}</span>}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map((item, index) => (
            <div key={index} className="step-item">
              <div className="step-number">{index + 1}</div>
              <h4 className="step-title">{item.step}</h4>
              <p className="step-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;