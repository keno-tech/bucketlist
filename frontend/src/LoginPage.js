import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Decoded token:', decoded);

    const userInfo = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // Navigate to the main page
        navigate('/main');
      } else {
        console.log('Failed to authenticate user');
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      navigate('/main'); // Redirect if the user is already logged in
    }
  }, [user, navigate]);

  return (
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login failed')}
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <img
            src={user.picture}
            alt="Profile"
            style={{
              borderRadius: '50%',
              width: '96px',
              height: '96px',
              objectFit: 'cover',
              marginTop: '10px',
            }}
          />
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
