import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBucketListPage.css';  

function CreateBucketListPage() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [achieved, setAchieved] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newBucketList = { title, description, imageUrl, achieved };

    try {
      const response = await fetch('http://localhost:5000/api/bucketlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBucketList),
      });

      if (response.ok) {
        navigate('/');
      } else {
        alert('Failed to create bucket list');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating bucket list');
    }
  };

  return (
    <div className="create-container">
      <h1>Create Your Bucket List</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        
        
        <div className="form-group">
          <label htmlFor="achieved">Achieved:</label>
          <input
            type="checkbox"
            id="achieved"
            checked={achieved}
            onChange={(e) => setAchieved(e.target.checked)}
          />
        </div>

        <button type="submit">Create Bucket List</button>
      </form>
    </div>
  );
}

export default CreateBucketListPage;
