import React from 'react';
import StatsPlayersTable from "./StatsPlayersTable";

class StatsPlayers extends React.Component {
  render() {
    return (
      <div className="playersTable">
        <StatsPlayersTable />
    </div>
      );
  }
}

export default StatsPlayers;
