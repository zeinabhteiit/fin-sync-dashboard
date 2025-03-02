import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Company Financial Tracker!</h1>
      <p>Manage your finances efficiently!</p>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};

export default Home;
