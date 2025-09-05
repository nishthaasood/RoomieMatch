import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'
import LoginPage from './Login.jsx'
import SignupPage from './Signup.jsx'
import Profile from './Profile.jsx'
import Matches from './Matches.jsx'
import ListARoom from './ListARoom.jsx'
import FindRoom from './FindRoom.jsx'
import Messages from './Messages.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [registerData, setRegisterData] = useState({})
  const [likedUser, setLikedUser] = useState(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} setIsLogin={setIsLogin} setAccessToken={setAccessToken} setRegisterData={setRegisterData} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} setUserData={setRegisterData}/>;
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} setIsLogin={setIsLogin} accessToken={accessToken} registerData={registerData}/>;
      case 'matches':
        return <Matches setCurrentPage={setCurrentPage} likedUser={likedUser} setLikedUser={setLikedUser} accessToken={accessToken} />;
      case 'listARoom': 
        return <ListARoom setCurrentPage={setCurrentPage} />;
      case 'findRoom':
        return <FindRoom setCurrentPage={setCurrentPage} />;
      case 'messages':  
        return <Messages setCurrentPage={setCurrentPage} />;
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