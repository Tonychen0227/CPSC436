import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
  AreaChart, Area,
} from 'recharts';



export default class MyTeamStats extends PureComponent {
  state = {
    data: [
    {
      name: 'Data A', uv: 40, pv: 24, amt: 24,
    },
    {
      name: 'Data B', uv: 30, pv: 13, amt: 22,
    },
    {
      name: 'Data C', uv: 20, pv: 98, amt: 22,
    },
    {
      name: 'Data D', uv: 27, pv: 39, amt: 20,
    },
    {
      name: 'Data E', uv: 18, pv: 48, amt: 21,
    },
    {
      name: 'Data F', uv: 23, pv: 38, amt: 25,
    },
    {
      name: 'Data G', uv: 34, pv: 43, amt: 21,
    },
  ]
}

  render() {
    return (
      <div>
        <p> D1 </p>
        <LineChart
          width={1000}
          height={300}
          data={this.state.data}
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
        <p> D2 </p>
        <LineChart
          width={1000}
          height={300}
          data={this.state.data}
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
        <p> D3 </p>
        <AreaChart
          width={1000}
          height={300}
          data={this.state.data}
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
