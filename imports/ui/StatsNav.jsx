import React from 'react';
import { NavLink } from 'react-router-dom';

const StatsNav = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <ul className="right">
          <li><NavLink to='/'>Players</NavLink></li>
          <li><NavLink to='/'>Teams</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default StatsNav;
