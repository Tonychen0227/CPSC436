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
          <nav>
          <div class="buttons">
            <Link to='/stats/players' className="button is-small is-link is-hovered">Players</Link>
            <Link to='/stats/teams' className="button is-small is-link is-hovered">Teams</Link>
            <Link to='/stats/analysis' className="button is-small is-link is-hovered">Analysis</Link>
          </div>
          </nav>
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
