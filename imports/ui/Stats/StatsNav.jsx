import React from 'react';
import { Link, Route } from 'react-router-dom';
import StatsPlayers from "./StatsPlayers";
import StatsTeams from "./StatsTeams";
import StatsAnalysis from "./StatsAnalysis";
import "../../../node_modules/bulma/css/bulma.css";
import '../../css/Stats.css';

class StatsNav extends React.Component {
  render() {
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
        <div className="tabs is-boxed">
          <nav>
          <ul>
            <li><Link to='/stats/players'>Players</Link></li>
            <li><Link to='/stats/teams'>Teams</Link></li>
            <li><Link to='/stats/analysis'>Analysis</Link></li>
          </ul>
          </nav>
        </div>
          <br />
          <Route exact path='/stats/players' component={StatsPlayers} />
          <Route exact path='/stats/teams' component={StatsTeams} />
          <Route exact path='/stats/analysis' component={StatsAnalysis} />
        </div>
      </nav>
    )
  }
}

export default StatsNav;
