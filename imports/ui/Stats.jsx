import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import StatsNav from './StatsNav';

class Stats extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="Stats">
          <StatsNav />
        </div>
      </BrowserRouter>
    );
  }
}

export default Stats;
