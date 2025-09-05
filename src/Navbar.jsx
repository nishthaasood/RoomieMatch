const Navbar = ({ setCurrentPage, currentPage, isLogin }) => {
  console.log(isLogin);
  
  return (
    <nav className="navbar">
      <div 
        className="logo"
        onClick={() => setCurrentPage('home')}
      >
        RoomieMatch
      </div>
      
      <div className="nav-links">
        
        {isLogin && <a 
          href="#"
          className={currentPage === 'messages' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('messages');
          }}
        >
          Messages
        </a>}
        
        {isLogin && <a 
          href="#"
          className={currentPage === 'matches' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('matches');
          }}
        >
          Find Roommate
        </a>}
        
        {/* Find a Room */}
        {isLogin&& 
        <a 
          href="#"
          className={currentPage === 'findRoom' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('findRoom');
          }}
        >
          Find a Room
        </a>}
        {isLogin &&
        <a 
          href="#"
          className={currentPage === 'profile' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('profile');
          }}
        >
          Profile
        </a>}
      </div>
      
      {!isLogin && (
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
      )}
    </nav>
  );
};

export default Navbar;