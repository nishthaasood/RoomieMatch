import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">RoomieMatch</h3>
          <p className="footer-description">
            Find your perfect roommate and make living together easier.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">🌐</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">How It Works</a></li>
            <li><a href="#" className="footer-link">Safety Tips</a></li>
            <li><a href="#" className="footer-link">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Support</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Help Center</a></li>
            <li><a href="#" className="footer-link">Contact Us</a></li>
            <li><a href="#" className="footer-link">Report Issue</a></li>
            <li><a href="#" className="footer-link">Feedback</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Legal</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Cookie Policy</a></li>
            <li><a href="#" className="footer-link">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          <p>&copy; 2025 RoomieMatch. All Rights Reserved.</p>
          <p className="footer-tagline">Making roommate matching simple and safe.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;