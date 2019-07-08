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
            <Link to='/stats/players'><button className="button is-small is-rounded is-blue hr-margin='2em 2em 2em 2em'">Players</button></Link>
            <Link to='/stats/teams'><button className="button is-small is-rounded is-blue">Teams</button></Link>
            <Link to='/stats/analysis'><button className="button is-small is-rounded is-blue">Analysis</button></Link>
          </nav>
          <Route exact path='/stats/players' component={StatsPlayers} />
          <Route exact path='/stats/teams' component={StatsTeams} />
          <Route exact path='/stats/analysis' component={StatsAnalysis} />
        </div>
      </nav>
    )
  }
}

export default StatsNav;
