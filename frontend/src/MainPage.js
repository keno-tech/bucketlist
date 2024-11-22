import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
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
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/view-bucketlists')}>View Bucket Lists</button>
        <button onClick={() => navigate('/create-bucketlist')} style={{ marginLeft: '10px' }}>
          Create Bucket List
        </button>
      </div>
    </div>
  );
}

export default MainPage;
