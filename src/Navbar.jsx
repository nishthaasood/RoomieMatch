
const Navbar = ({ setCurrentPage, currentPage }) => {
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
        <a href="#" onClick={(e) => e.preventDefault()}>Messages</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Matches</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Food Services</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Profile</a>
      </div>
      
      <div className="auth-buttons">
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
      </div>
    </nav>
  );
};

export default Navbar;