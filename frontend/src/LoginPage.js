import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google Login Failed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
      <h1>Login with Google</h1>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </div>
  );
};

export default LoginPage;
