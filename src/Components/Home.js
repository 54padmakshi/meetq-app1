// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to MeetQ!</h2>
      <p>Express yourself creatively through mood boards!</p>
      <Link to="/moodboard">
        <button>Create a Mood Board</button>
      </Link>
    </div>
  );
};

export default Home;
