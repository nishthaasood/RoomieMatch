import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'
import LoginPage from './Login.jsx'
import SignupPage from './Signup.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  return (
    <div className="app">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  );

}
export default App
