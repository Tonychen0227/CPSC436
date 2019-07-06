import React from 'react';
import { Link, Route } from 'react-router-dom';
import StatsPlayers from "./StatsPlayers";
import StatsTeams from "./StatsTeams";
import '../../css/Stats'

class StatsNav extends React.Component {
  render() {
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <nav>
            <Link to='/stats/players'><button className="playersButton">Players</button></Link>
            <Link to='/stats/teams'><button className="teamsButton">Teams</button></Link>
          </nav>
          <Route exact path='/stats/players' component={StatsPlayers} />
          <Route exact path='/stats/teams' component={StatsTeams} />
        </div>
      </nav>
    )
  }
}

export default StatsNav;
