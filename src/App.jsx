import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'
import LoginPage from './Login.jsx'
import SignupPage from './Signup.jsx'
import Profile from './Profile.jsx'
import Matches from './Matches.jsx'
import ListARoom from './ListRoom.jsx'
import FindRoom from './FindRoom.jsx' // Make sure this import exists

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('') 

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} setIsLogin={setIsLogin} setAccessToken={setAccessToken} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} accessToken={accessToken}/>;
      case 'matches':
        return <Matches setCurrentPage={setCurrentPage} />;
      case 'listRoom': 
        return <ListARoom setCurrentPage={setCurrentPage} />;
      case 'findRoom':
        return <FindRoom setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} isLogin={isLogin} />
      {renderPage()}
    </div>
  );
}

export default App;