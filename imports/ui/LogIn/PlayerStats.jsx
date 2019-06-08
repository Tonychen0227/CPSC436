import React from 'react';
import LoremIpsum from '../LoremIpsum';

class PlayerStats extends React.Component {
	render() {
		return (
			<div>
			<h4> Home Team Player Stats </h4>
			<h5>here is gonna display the stats of all players in your home team</h5>
			<LoremIpsum/>
			</div>
);
	}
}

export default PlayerStats;
