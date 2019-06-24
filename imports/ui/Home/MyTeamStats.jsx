import React, { Component } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';

export default class MyTeamStats extends Component {
	state = {
		data: [
		  {
		    name: 'D1', uv: 590, pv: 800, amt: 1400,
		  },
		  {
		    name: 'D2', uv: 868, pv: 967, amt: 1506,
		  },
		  {
		    name: 'D3', uv: 1397, pv: 1098, amt: 989,
		  },
		  {
		    name: 'D4', uv: 1480, pv: 1200, amt: 1228,
		  },
		  {
		    name: 'D5', uv: 1520, pv: 1108, amt: 1100,
		  },
		  {
		    name: 'D6', uv: 1400, pv: 680, amt: 1700,
		  },
		]
	}
  render() {
    return (
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={this.state.data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />

        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
				<Bar dataKey="uv" barSize={20} fill="#e23636" />

      </ComposedChart>
    );
  }
}
