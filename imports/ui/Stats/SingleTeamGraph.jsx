import React, { Component } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class SingleTeamGraph extends Component {
  render() {
    const { selectedTeamInfo } = this.props;
    console.log(selectedTeamInfo);
    return (
      <BarChart
        width={1500}
        height={600}
        data={selectedTeamInfo}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        <Bar dataKey="data" fill="#8884d8" />
      </BarChart>
    );
  }
}
