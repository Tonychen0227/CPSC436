import React from 'react';
import UpcomingGames from './UpcomingGames';
import PastGames from './PastGames';

class MatchInformation extends React.Component {
	render() {
		return (
			<div>
				<UpcomingGames/>
				<PastGames/>
			</div>
);
	}
}

export default MatchInformation;
