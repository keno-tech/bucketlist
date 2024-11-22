import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import CreateBucketListPage from './CreateBucketListPage';
import BucketListsPage from './BucketListsPage';
import AuthMiddleware from './AuthMiddleware';

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <div>Configuration error. Please check the environment variables.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={
            <AuthMiddleware>
              <MainPage />
            </AuthMiddleware>
            
            } />
          <Route path="/view-bucketlists" element={<BucketListsPage />} />
          <Route
            path="/create-bucketlist"
            element={
              <AuthMiddleware>
                <CreateBucketListPage />
              </AuthMiddleware>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
