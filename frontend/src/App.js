import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
// Import other components you will create
// import TopBucketLists from './TopBucketLists';
// import RecentBucketLists from './RecentBucketLists';
// import CreateBucketList from './CreateBucketList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Define the routes for the other pages */}
        {/* <Route path="/top-bucketlists" element={<TopBucketLists />} />
        <Route path="/recent-bucketlists" element={<RecentBucketLists />} />
        <Route path="/create-bucketlist" element={<CreateBucketList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
