
const Navbar = ({ setCurrentPage, currentPage,isLogin }) => {
  console.log(isLogin)
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
        {/* <a href="#" onClick={(e) => e.preventDefault()}>Matches</a> */}
        <a 
          href="#" 
          className={currentPage === 'matches' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('matches');
          }}
        >
          Matches
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>List A Room</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Find Your Roommate</a>
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
      
      {!isLogin && < div className="auth-buttons">
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
      </div>}
    </nav>
  );
};

export default Navbar;