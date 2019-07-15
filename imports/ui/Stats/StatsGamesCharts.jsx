import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

export default class StatsGamesCharts extends Component {
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

  getAdjustedGameDate = originalDate => {
    const month = originalDate.toString().slice(4,7);
    const date = originalDate.toString().slice(8,10);
    const year = originalDate.toString().slice(11,15);
    let monthNum;
    switch (month) {
      case 'Jan':
        monthNum = '01';
        break;
      case 'Feb':
        monthNum = '02';
        break;
      case 'Mar':
        monthNum = '03';
        break;
      case 'Apr':
        monthNum = '04';
        break;
      case 'May':
        monthNum = '05';
        break;
      case 'Jun':
        monthNum = '06';
        break;
      case 'Jul':
        monthNum = '07';
        break;
      case 'Aug':
        monthNum = '08';
        break;
      case 'Sep':
        monthNum = '09';
        break;
      case 'Oct':
        monthNum = '10';
        break;
      case 'Nov':
        monthNum = '11';
        break;
      case 'Dec':
        monthNum = '12';
        break;
      default: monthNum = '07';
    }
    return year.concat('-',monthNum,'-',date);
  }

  getDailyGames = gameDate => {
    var originalGames = this.state.games;
    console.log(originalGames);
    var dailyGames = originalGames.filter(function (game) {
      return game["schedule"]["startTime"].includes(gameDate);
    });
    return dailyGames;
  }

  getGamesData = dailyGames => {
    console.log(dailyGames);
    var gameData = [];
    dailyGames.map(function (game) {
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
      var match = homeTeam + ' VS ' +awayTeam;
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
        match: match
      }
      gameData.push(gameObj);
      return;
    });
    return gameData;
  }

  render() {
    const { gameDate } = this.props;
    let adjustGameDate = this.getAdjustedGameDate(gameDate);
    let dailyGames = this.getDailyGames(adjustGameDate);
    let gameData = this.getGamesData(dailyGames);
    return (
      <BarChart
        width={1200}
        height={400}
        data={gameData}
        margin={{
          top: 20, right: 30, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="match" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="a1s" stackId="a" fill="#8884d8" name="away team Q1 score" />
        <Bar dataKey="a2s" stackId="a" fill="#159DA6" name="away team Q2 score"/>
        <Bar dataKey="a3s" stackId="a" fill="#15A643" name="away team Q3 score"/>
        <Bar dataKey="a4s" stackId="a" fill="#99D33A" name="away team Q4 score"/>
        <Bar dataKey="h1s" stackId="b" fill="#82ca9d" name="home team Q1 score"/>
        <Bar dataKey="h2s" stackId="b" fill="#CC3AD3" name="home team Q2 score"/>
        <Bar dataKey="h2s" stackId="b" fill="#8C1879" name="home team Q3 score"/>
        <Bar dataKey="h2s" stackId="b" fill="#C21F3F" name="home team Q4 score"/>
      </BarChart>
    );
  }
}
