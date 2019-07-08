import React from 'react';
import PlayerSelector from './PlayerSelector';
import DropdownSearchBar from './DropdownSearchBar';

class StatsAnalysis extends React.Component {
  render() {
    return (
      <div className="statsAnalysis">
        <PlayerSelector />
        <DropdownSearchBar />
      </div>
    )
  }
}

export default StatsAnalysis;
