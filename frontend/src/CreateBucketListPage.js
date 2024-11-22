import React, { useState, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import './CreateBucketListPage.css';

function CreateBucketListPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dreams, setDreams] = useState([{ title: '', description: '', images: [], achieved: false }]);
  const [userBucketList, setUserBucketList] = useState(null); // State to hold user's existing bucket list
  const [userId, setUserId] = useState(null); // State to hold the userId

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Parse the stored object
  
    if (user && user.email) { // Check if user object and email exist
      const fetchUserId = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/get-user-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }), // Use email from the user object
          });
  
          if (response.ok) {
            const data = await response.json();
            setUserId(data.userId); // Set the userId from the backend
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      };
  
      fetchUserId();
    }
  }, []); // Empty dependency array means this will run once when the component mounts
  

  useEffect(() => {
    // If userId is available, fetch user's bucket list
    if (userId) {

      const fetchUserBucketList = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/bucketlist?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUserBucketList(data); // Set existing bucket list if exists
          } else {
            setUserBucketList(null); // User does not have a bucket list
          }
        } catch (error) {
          console.error('Error fetching bucket list:', error);
        }
      };

      fetchUserBucketList();
    }
  }, [userId]); // Dependency on userId, so it runs when userId is set

  const handleDreamChange = (index, field, value) => {
    const updatedDreams = [...dreams];
    updatedDreams[index][field] = value;
    setDreams(updatedDreams);
  };

  const addDream = () => {
    setDreams([...dreams, { title: '', description: '', images: [], achieved: false }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userBucketList) {

      const newBucketList = { userId, title, description };
      try {
        const response = await fetch('http://localhost:5000/api/bucketlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBucketList),
        });

        if (response.ok) {
          const data = await response.json();
          setUserBucketList(data); // Update the state with the new bucket list
          alert('Bucket List Created!');
        } else {
          alert('Failed to create bucket list');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating bucket list');
      }
    } else {
      // If the user already has a bucket list, add dreams to it
      const bucketListId = userBucketList.id;
      try {
        const dreamPromises = dreams.map((dream) => {
          return fetch('http://localhost:5000/api/dreams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...dream, bucketListId }),
          });
        });

        const results = await Promise.all(dreamPromises);
        if (results.every((res) => res.ok)) {
          alert('Dreams added successfully!');
          navigate('/');
        } else {
          alert('Failed to add dreams');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding dreams');
      }
    }
  };

  return (
    <div className="create-container">
      <h1>{userBucketList ? 'Add Dreams to Your Bucket List' : 'Create Your Bucket List'}</h1>
      <form onSubmit={handleSubmit}>
        {userBucketList ? (
          <div>
            <h2>Dreams</h2>
            {dreams.map((dream, index) => (
              <div key={index} className="dream-container">
                <div className="form-group">
                  <label htmlFor={`dream-title-${index}`}>Dream Title:</label>
                  <input
                    type="text"
                    id={`dream-title-${index}`}
                    value={dream.title}
                    onChange={(e) => handleDreamChange(index, 'title', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`dream-description-${index}`}>Description:</label>
                  <textarea
                    id={`dream-description-${index}`}
                    value={dream.description}
                    onChange={(e) => handleDreamChange(index, 'description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`dream-achieved-${index}`}>Achieved:</label>
                  <input
                    type="checkbox"
                    id={`dream-achieved-${index}`}
                    checked={dream.achieved}
                    onChange={(e) => handleDreamChange(index, 'achieved', e.target.checked)}
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={addDream}>Add Another Dream</button>
            <button type="submit">Add Dreams</button>
          </div>
        ) : (
          <div>
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
            <button type="submit">Create Bucket List</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateBucketListPage;
