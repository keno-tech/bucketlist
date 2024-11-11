import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';  
import CreateBucketListPage from './CreateBucketListPage'; 
import BucketListsPage from './BucketListsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-bucketlist" element={<CreateBucketListPage />} />
        <Route path="/view-bucketlists" element={<BucketListsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
