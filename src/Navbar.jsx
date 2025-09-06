import { useState } from "react";

const Navbar = ({ setCurrentPage, currentPage, isLogin, setIsLogin }) => {
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  return (
    <nav className="navbar">
      <div 
        className="logo"
        onClick={() => setCurrentPage('home')}
      >
        RoomieMatch
      </div>
      
      <div className="nav-links">
        <a 
          href="#"
          className={currentPage === 'home' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
          }}
        >
          Home
        </a>
        
        <a 
          href="#"
          className={currentPage === 'messages' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('messages');
          }}
        >
          Messages
        </a>
        
        <a 
          href="#"
          className={currentPage === 'matches' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('matches');
          }}
        >
          Find Roommate
        </a>
        
        <a 
          href="#"
          className={currentPage === 'findRoom' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('findRoom');
          }}
        >
          Find a Room
        </a>
        
        <a 
          href="#"
          className={currentPage === 'profile' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('profile');
          }}
        >
          Profile
        </a>
      </div>
      
      <div className="auth-buttons">
        {isLogin ? (
          <>
            {/* Profile Footer Style Button */}
            <button 
              className="signout-btn"
              onClick={() => {
                setShowSignOutModal(true)
              }}
            >
              <span className="btn-icon">⏻</span>
              Sign Out
            </button>

            {/* Sign Out Confirmation Modal */}
            {showSignOutModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Confirm Sign Out</h3>
                  <p>
                    Are you sure you want to sign out? You'll need to log in
                    again to access your profile.
                  </p>
                  <div className="modal-actions">
                    <button
                      onClick={() => {
                        setIsLogin(false);
                        setShowSignOutModal(false);
                        setCurrentPage("home");
                      }}
                      className="confirm-btn"
                    >
                      Yes, Sign Out
                    </button>
                    <button
                      onClick={() => setShowSignOutModal(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button 
              className="login-btn"
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
            <button 
              className="signup-btn"
              onClick={() => setCurrentPage('signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
