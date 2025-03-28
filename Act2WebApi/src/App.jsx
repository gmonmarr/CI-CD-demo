// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import StandardImageList from './components/Contacto.jsx';
import ResponsiveAppBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import { getToken, isTokenValid } from './utils/tokenUtils';

function AppContent({ handleLogout, isTokenValidState, checkTokenValidity }) {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <ResponsiveAppBar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isTokenValidState ? '/dashboard' : '/login'} replace />}
        />
        <Route
          path="/login"
          element={
            isTokenValidState ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLoginSuccess={checkTokenValidity} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isTokenValidState ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/contacto"
          element={isTokenValidState ? <StandardImageList /> : <Navigate to="/login" replace />}
        />
        {/* Catch-all route: any unrecognized path will redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

function App() {
  const [isTokenValidState, setIsTokenValidState] = useState(null);

  const checkTokenValidity = async () => {
    const token = getToken();
    if (token) {
      const valid = await isTokenValid(token);
      setIsTokenValidState(valid);
    } else {
      setIsTokenValidState(false);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const handleLogout = () => {
    setIsTokenValidState(false);
  };

  if (isTokenValidState === null) {
    console.log("Token validity check still in progress...");
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppContent
        handleLogout={handleLogout}
        isTokenValidState={isTokenValidState}
        checkTokenValidity={checkTokenValidity}
      />
    </Router>
  );
}

export default App;