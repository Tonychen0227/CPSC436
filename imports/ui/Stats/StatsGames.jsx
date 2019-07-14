import React from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import StatsGamesCharts from './StatsGamesCharts';

class StatsGames extends React.Component {

  state = {
    games: [],
    date: new Date(),
  }

  componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getGames')
      .then(res => {
        this.setState({
          games: res.data
        })
      });
  }

  onChange = date => this.setState({ date })

  render() {
    const { games, date } = this.state;
    console.log(this.state);
    return (
      <div className="container">
        <div>
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <StatsGamesCharts />
      </div>
      );
  }
}

export default StatsGames;
