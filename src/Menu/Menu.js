import React from 'react';
import {
  Link
} from "react-router-dom";

function Menu() {
  return (
    <nav className="menu">
    <ul>
      <li title="Go to Home page"><Link to="">Home</Link></li>
      <li title="Go to About page"><Link to="/about">About</Link></li>
      <li title="Go to Login page"><Link to="/login">Login</Link></li>
    </ul>
  </nav>
  );
}

export default Menu;
