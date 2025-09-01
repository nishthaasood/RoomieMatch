import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'
import LoginPage from './Login.jsx'
import SignupPage from './Signup.jsx'
import Profile from './Profile.jsx'
import ListARoom from './listRoom.jsx'   

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLogin, setIsLogin] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} setIsLogin={setIsLogin} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} />;
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
