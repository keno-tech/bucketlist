import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [achieved, setAchieved] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bucketlists', {
        title,
        description,
        imageUrl,
        achieved,
      });
      setResponse(res.data); // Set response to show feedback on successful creation
    } catch (error) {
      console.error('Error creating bucket list:', error);
    }
  };

  return (
    <div className="App">
      <h1>Create a Bucket List Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Achieved:</label>
          <input
            type="checkbox"
            checked={achieved}
            onChange={(e) => setAchieved(e.target.checked)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Bucket List Created:</h2>
          <p>ID: {response.id}</p>
          <p>Title: {response.title}</p>
          <p>Description: {response.description}</p>
          <p>Image URL: {response.imageUrl}</p>
          <p>Achieved: {response.achieved ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
