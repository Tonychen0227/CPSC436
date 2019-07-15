import React from 'react';
import DatePicker from 'react-date-picker';
import StatsGamesCharts from './StatsGamesCharts';

class StatsGames extends React.Component {

  state = {
    date: new Date()
  }

  onChange = date => {
    this.setState({ date })
  }

  render() {
    return (
      <div className="container">
        <div>
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <StatsGamesCharts gameDate={this.state.date}/>
      </div>
      );
  }
}

export default StatsGames;
