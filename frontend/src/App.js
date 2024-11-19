import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './LoginPage';

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; 

  if (!clientId) {
    console.error('Google Client ID is missing. Please set REACT_APP_GOOGLE_CLIENT_ID in .env');
    return <div>Configuration error. Please check the environment variables.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
