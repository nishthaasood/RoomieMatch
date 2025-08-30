import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import HomePage from './HomePage'
import Footer from './Footer'
import LoginPage from './LoginPage'
import SignupPage from './Signup'

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
      {renderPage()}
    </div>
  );

}
export default App
