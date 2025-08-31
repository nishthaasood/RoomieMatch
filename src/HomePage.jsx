import Navbar from './Navbar';
import Footer from './Footer';
import roomieImage from './assets/roomie.jpeg';
import { ChevronRight, Users, MessageCircle, MapPin, Shield, Utensils, Star, ArrowRight, Check, Heart, Home, Sparkles, Zap, Coffee, Clock, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const HomePage = ({ setCurrentPage }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
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
    { 
      step: 'Create Your Profile', 
      description: 'Share your lifestyle, interests, and roommate preferences in just 2 minutes.',
      icon: <Users className="w-6 h-6" />,
      color: 'from-violet-500 to-purple-600'
    },
    { 
      step: 'Get AI-Matched', 
      description: 'Our smart algorithm finds compatible roommates based on 50+ data points.',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      step: 'Connect & Chat', 
      description: 'Message matches instantly, schedule video calls, and get to know each other.',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      step: 'Move In Together', 
      description: 'Find your perfect living space and start your new chapter with confidence.',
      icon: <Home className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="modern-hero" id="home">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 50,000+ Users</span>
              <div className="badge-pulse"></div>
            </div>
            
            <h1 className="modern-welcome">
              Find Your Perfect
              <span className="hero-highlight"> Roommate </span>
              in Minutes
            </h1>
            
            <p className="modern-subtitle">
              Join the leading platform that uses AI to match compatible roommates. 
              Safe, smart, and designed for today's lifestyle.
            </p>
            
            <div className="hero-features-preview">
              <div className="preview-item">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="preview-item">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Instant Messaging</span>
              </div>
              <div className="preview-item">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Verified Profiles</span>
              </div>
            </div>
            
            <div className="hero-buttons">
              <button 
                className="primary-hero-btn"
                onClick={() => setCurrentPage('signup')}
              >
                <Sparkles className="w-5 h-5" />
                Start Matching Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="secondary-hero-btn">
                <span>Watch How It Works</span>
              </button>
            </div>
            
            <div className="trust-indicators">
              <div className="trust-item">
                <div className="trust-icon">⭐</div>
                <div className="trust-text">
                  <div className="trust-score">4.9/5</div>
                  <div className="trust-label">User Rating</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🛡️</div>
                <div className="trust-text">
                  <div className="trust-score">100%</div>
                  <div className="trust-label">Verified Safe</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🚀</div>
                <div className="trust-text">
                  <div className="trust-score">2 Min</div>
                  <div className="trust-label">Setup Time</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-interface">
                  <div className="interface-header">
                    <div className="header-title">Your Matches</div>
                    <div className="notification-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="modern-features" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Star className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="section-title">
              Everything You Need to Find
              <br />
              <span className="title-highlight">Your Perfect Roommate</span>
            </h2>
            <p className="section-subtitle">
              Discover powerful features designed to make roommate matching effortless, safe, and successful.
            </p>
          </div>
          
          <div className="features-showcase">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`modern-feature ${activeFeature === index ? 'featured' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`feature-background ${feature.bg}`}></div>
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient} text-white`}>
                  {feature.icon}
                </div>
                {feature.highlight && (
                  <div className="feature-highlight">
                    <Sparkles className="w-3 h-3" />
                    {feature.highlight}
                  </div>
                )}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-cta">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="modern-process" id="how-it-works">
        <div className="container">
          <div className="process-header">
            <h2 className="process-title">
              Get Started in 
              <span className="process-highlight">4 Easy Steps</span>
            </h2>
            <p className="process-subtitle">
              From signup to move-in, we make finding roommates simple and stress-free.
            </p>
          </div>
          
          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                <div className={`step-icon bg-gradient-to-br ${step.color}`}>
                  {step.icon}
                </div>
                <h4 className="step-title">{step.step}</h4>
                <p className="step-description">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="process-cta">
            <div className="cta-card">
              <div className="cta-content">
                <h3>Ready to Find Your Perfect Roommate?</h3>
                <p>Join thousands who've found their ideal living situation</p>
              </div>
              <button 
                className="cta-button"
                onClick={() => setCurrentPage('signup')}
              >
                <Zap className="w-5 h-5" />
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default HomePage;