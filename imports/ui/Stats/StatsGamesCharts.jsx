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
    console.log(this.state);
  }

  // 2018-04-14
  render() {
    const { gameDate } = this.props;
    let adjustGameDate = this.getAdjustedGameDate(gameDate);
    let dailyGames = this.getDailyGames(adjustGameDate);
    console.log(dailyGames);
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#ffc658" />
      </BarChart>
    );
  }
}
