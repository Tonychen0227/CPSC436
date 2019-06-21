import React from 'react';
import Fragment from 'react';
import UserDetails from './UserDetails';
import NewsDashboard from './NewsDashboard';
import PlayerStats from './PlayerStats';
import MyAccount from './MyAccount';
import MatchInformation from './MatchInformation';
import '../../css/LogIn.css';

class LogIn extends React.Component {
	render() {
		return (
			<MyAccount/>
		);
	};
}

export default LogIn;
