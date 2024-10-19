import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>MeetQ App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/moodboard">Mood Board</Link>
      </nav>
    </div>
  );
};

export default Navbar;

