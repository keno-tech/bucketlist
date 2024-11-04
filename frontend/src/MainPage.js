import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Ensure you're importing the CSS

function MainPage() {
  const navigate = useNavigate();

  const handleTopBucketListsClick = () => {
    navigate('/top-bucketlists');
  };

  const handleRecentBucketListsClick = () => {
    navigate('/recent-bucketlists');
  };

  const handleCreateBucketListClick = () => {
    navigate('/create-bucketlist');
  };

  return (
    <div className="container">
      <h1>Welcome to the Bucket List</h1>
      <div className="button-container">
        <button onClick={handleTopBucketListsClick}>See Top Bucket Lists</button>
        <button onClick={handleRecentBucketListsClick}>See Recent Bucket Lists</button>
        <button onClick={handleCreateBucketListClick}>Create Your Own Bucket List</button>
      </div>
    </div>
  );
}

export default MainPage;
