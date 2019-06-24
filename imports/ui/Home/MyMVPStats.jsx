import React, { Component } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}`}</p>
      </div>
    );
  }
	return null;
};

export default class MyMVPStats extends Component {

	state = {
		data: [
		  {
		    subject: 'D1', A: 120, fullMark: 150,
		  },
		  {
		    subject: 'D2', A: 98, fullMark: 150,
		  },
		  {
		    subject: 'D3', A: 86, fullMark: 150,
		  },
		  {
		    subject: 'D4', A: 99, fullMark: 150,
		  },
		  {
		    subject: 'D5', A: 85, fullMark: 150,
		  },
		  {
		    subject: 'D6', A: 65, fullMark: 150,
		  },
			{
		    subject: 'D7', A: 65, fullMark: 150,
		  },
		],
		opacity: {
      uv: 1,
      pv: 1,
    },
	}

	handleMouseEnter = (o) => {
	const { dataKey } = o;
	const { opacity } = this.state.opacity;

	this.setState({
		opacity: { ...opacity, [dataKey]: 0.5 },
	});
}

	handleMouseLeave = (o) => {
		const { dataKey } = o;
		const { opacity } = this.state.opacity;

		this.setState({
			opacity: { ...opacity, [dataKey]: 1 },
		});
	}

  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={900} height={500} data={this.state.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
				<Tooltip content={<CustomTooltip />} />
        <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
        <Radar name="LBJ" dataKey="A" stroke="#7070b3" fill="#363642" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}
