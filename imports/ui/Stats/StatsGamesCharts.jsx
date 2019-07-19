import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';

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
        name: match
      }
      gameData.push(gameObj);
      return;
    });
    return gameData;
  }

  render() {
    const { gameDate } = this.props;
    let adjustGameDate;
    let dailyGames;
    let gameData;
    if (gameDate !== null) {
      adjustGameDate = this.getAdjustedGameDate(gameDate);
      dailyGames = this.getDailyGames(adjustGameDate);
      gameData = this.getGamesData(dailyGames);
    } else {
      gameData = null;
    }
    return (
      <div>
        <BarChart
          width={1200}
          height={400}
          data={gameData}
          margin={{
            top: 20, right: 30, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="a1s" stackId="a" fill="#80bff2" name="away team Q1 score" />
          <Bar dataKey="a2s" stackId="a" fill="#3295e6" name="away team Q2 score"/>
          <Bar dataKey="a3s" stackId="a" fill="#2569e6" name="away team Q3 score"/>
          <Bar dataKey="a4s" stackId="a" fill="#17408B" name="away team Q4 score"/>
          <Bar dataKey="h1s" stackId="b" fill="#f0a8b5" name="home team Q1 score"/>
          <Bar dataKey="h2s" stackId="b" fill="#cc7282" name="home team Q2 score"/>
          <Bar dataKey="h2s" stackId="b" fill="#C7465C" name="home team Q3 score"/>
          <Bar dataKey="h2s" stackId="b" fill="#C9082A" name="home team Q4 score"/>
        </BarChart>
      </div>
    );
  }
}
