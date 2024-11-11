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
              {bucketList.imageUrl && <img src={bucketList.imageUrl} alt={bucketList.title} />}
              <p>{bucketList.achieved ? 'Achieved' : 'Not Achieved'}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BucketListsPage;
