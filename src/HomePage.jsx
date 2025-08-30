import Navbar from './Navbar';
import Footer from './Footer';
import roomieImage from './assets/roomie.jpeg';


const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      title: 'Smart Matching',
      description: 'Get paired with compatible roommates using our intelligent matching system.'
    },
    {
      title: 'Instant Messaging',
      description: 'Chat with your matches directly through our secure messaging platform.'
    },
    {
      title: 'Food Services',
      description: 'Access shared food services and discounts tailored for students and young professionals.'
    },
    {
      title: 'Deal Breakers',
      description: 'Set your non-negotiables and find roommates who respect your boundaries.'
    },
    {
      title: 'Location Matching',
      description: 'Find roommates in your preferred neighborhoods or areas with our location-based search.'
    }
  ];

  const steps = [
    {
      step: 'Sign Up',
      description: 'Create your profile with details about your lifestyle and preferences.'
    },
    {
      step: 'Get Matched',
      description: 'Our algorithm suggests potential roommates based on compatibility.'
    },
    {
      step: 'Connect',
      description: 'Use our messaging system to chat and get to know your matches.'
    },
    {
      step: 'Choose Your Roommate',
      description: 'Decide who you want to live with and finalize the arrangements.'
    }
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
            {/* Replace 'your-image.jpg' with your actual image path */}
            <img 
              src="/src/assets/roomie.jpeg" 
              alt="Roommates" 
              className="hero-image-actual"
              onError={(e) => {
                // Fallback to emoji if image doesn't load
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '🏠';
                e.target.parentNode.style.fontSize = '120px';
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="works">
        <h2>How It Works</h2>
        <div className="steps-list">
          {steps.map((item, index) => (
            <div key={index} className="step-item">
              <strong>{item.step}:</strong> {item.description}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
