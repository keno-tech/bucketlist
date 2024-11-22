import React, { useEffect, useState } from 'react';
import './BucketListsPage.css';  

function BucketListsPage() {
  const [bucketLists, setBucketLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBucketLists = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bucketlists');
        if (response.ok) {
          const data = await response.json();
          setBucketLists(data);
        } else {
          throw new Error('Failed to fetch bucket lists');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBucketLists();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bucketlists-container">
      <h1>View Bucket Lists</h1>
      <div className="bucketlists-list">
        {bucketLists.length === 0 ? (
          <p>No bucket lists found.</p>
        ) : (
          bucketLists.map((bucketList) => (
            <div key={bucketList.id} className="bucketlist-item">
              <h3>{bucketList.title}</h3>
              <p>{bucketList.description}</p>
              <h4>Dreams:</h4>
              {bucketList.dreams && bucketList.dreams.length > 0 ? (
                <ul>
                  {bucketList.dreams.map((dream) => (
                    <li key={dream.id}>
                      <strong>{dream.title}</strong>
                      <p>{dream.description}</p>
                      <p>{dream.achieved ? 'Achieved' : 'Not Achieved'}</p>
                      <p>Likes: {dream.likes}</p>
                      {dream.images && dream.images.length > 0 && (
                        <div>
                          {dream.images.map((image, idx) => (
                            <img key={idx} src={image} alt={dream.title} />
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No dreams in this bucket list.</p>
              )}
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BucketListsPage;
