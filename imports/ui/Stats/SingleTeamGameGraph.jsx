import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area,
} from 'recharts';
import axios from 'axios';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class SingleTeamGameGraph extends React.Component {

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
      console.log(this.state);
  }

  createHomeTeamRegularGamesObj = (games, teamAbbr) => {
    var gamesData = [];
    games.map(function (game) {
      if (game["schedule"]["homeTeam"]["abbreviation"] === teamAbbr && game["season"] === "2018-19Regular") {
        var homeTeam = game["schedule"]["homeTeam"]["abbreviation"];
        var awayTeam = game["schedule"]["awayTeam"]["abbreviation"];
        var homeQ1Score = game["score"]["quarters"]["0"]["homeScore"];
        var homeQ2Score = game["score"]["quarters"]["1"]["homeScore"];
        var homeQ3Score = game["score"]["quarters"]["2"]["homeScore"];
        var homeQ4Score = game["score"]["quarters"]["3"]["homeScore"];
        var awayQ1Score = game["score"]["quarters"]["0"]["awayScore"];
        var awayQ2Score = game["score"]["quarters"]["1"]["awayScore"];
        var awayQ3Score = game["score"]["quarters"]["2"]["awayScore"];
        var awayQ4Score = game["score"]["quarters"]["3"]["awayScore"];
        var startTime = game["schedule"]["startTime"];
        var season = game["season"];
        var gameObj = {
          ht: homeTeam,
          at: awayTeam,
          h1s: homeQ1Score,
          h2s: homeQ2Score,
          h3s: homeQ3Score,
          h4s: homeQ4Score,
          a1s: awayQ1Score,
          a2s: awayQ2Score,
          a3s: awayQ3Score,
          a4s: awayQ4Score,
          time: startTime,
          season: season
        };
        gamesData.push(gameObj);
      }
      return;
    });
    return gamesData;
  }

  createAwayTeamRegularGamesObj = (games, teamAbbr) => {
    var gamesData = [];
    games.map(function (game) {
      if (game["schedule"]["awayTeam"]["abbreviation"] === teamAbbr && game["season"] === "2018-19Regular") {
        var homeTeam = game["schedule"]["homeTeam"]["abbreviation"];
        var awayTeam = game["schedule"]["awayTeam"]["abbreviation"];
        var homeQ1Score = game["score"]["quarters"]["0"]["homeScore"];
        var homeQ2Score = game["score"]["quarters"]["1"]["homeScore"];
        var homeQ3Score = game["score"]["quarters"]["2"]["homeScore"];
        var homeQ4Score = game["score"]["quarters"]["3"]["homeScore"];
        var awayQ1Score = game["score"]["quarters"]["0"]["awayScore"];
        var awayQ2Score = game["score"]["quarters"]["1"]["awayScore"];
        var awayQ3Score = game["score"]["quarters"]["2"]["awayScore"];
        var awayQ4Score = game["score"]["quarters"]["3"]["awayScore"];
        var startTime = game["schedule"]["startTime"];
        var season = game["season"];
        var gameObj = {
          ht: homeTeam,
          at: awayTeam,
          h1s: homeQ1Score,
          h2s: homeQ2Score,
          h3s: homeQ3Score,
          h4s: homeQ4Score,
          a1s: awayQ1Score,
          a2s: awayQ2Score,
          a3s: awayQ3Score,
          a4s: awayQ4Score,
          time: startTime,
          season: season
        };
        gamesData.push(gameObj);
      }
      return;
    });
    return gamesData;
  }

  render() {
    const { teamAbbr } = this.props;
    var homeTeamRegularGames = this.createHomeTeamRegularGamesObj(this.state.games, teamAbbr);
    var awayTeamRegularGames = this.createAwayTeamRegularGamesObj(this.state.games, teamAbbr);
    console.log(homeTeamRegularGames);
    console.log(awayTeamRegularGames);
    return (
      <div>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          <Brush />
        </LineChart>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </div>
    );
  }
}
