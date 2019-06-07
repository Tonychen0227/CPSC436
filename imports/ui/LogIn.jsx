import React from 'react';
import Fragment from 'react';
import UserDetails from './LogIn/UserDetails';
import NewsDashboard from './LogIn/NewsDashboard';
import PlayerStats from './LogIn/PlayerStats';
import MatchInformation from './LogIn/MatchInformation';
import '../css/LogIn.css';

class LogIn extends React.Component {
	render() {
		return (
			<div className="main">
				<h1> Welcome to your account page </h1>
				<div className="left">
					<div className="playerStats inner">
						<PlayerStats/>
					</div>
					<div className="newsDashboard inner">
						<NewsDashboard/>
					</div>
				</div>
				<div className="right">
					<div className="userDetails inner">
						<UserDetails/>
					</div>
					<div className="matchInformation inner">
						<MatchInformation/>
					</div>
				</div>
			</div>
		);
	};
}

export default LogIn;
