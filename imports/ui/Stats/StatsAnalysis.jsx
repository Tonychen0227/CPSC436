import React, { Component } from 'react';
import DropdownSearchBar from './DropdownSearchBar';
import axios from 'axios';

class StatsAnalysis extends Component {
  state = {
    games: []
  }

  componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getGames')
      .then(res => {
        this.setState({
          games: res.data
        })
      });
  }

  render() {
    const { games } = this.state;
    console.log(games);
    return (
      <div className="statsAnalysis">
        <DropdownSearchBar />
      </div>
    )
  }
}

export default StatsAnalysis;
