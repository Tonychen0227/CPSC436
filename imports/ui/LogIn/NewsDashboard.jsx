import React from 'react';
import LoremIpsum from '../LoremIpsum';
import News from './News';

class NewsDashboard extends React.Component {
	render() {
		return (
			<div>
				<h4> News and other cool stuff (like comments from reddit nba) </h4>
				<div className="top">
					<div className="News">
						<News />
					</div>
				</div>
			</div>
);
	}
}

export default NewsDashboard;
