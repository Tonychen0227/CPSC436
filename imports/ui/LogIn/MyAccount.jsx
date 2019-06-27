import React from 'react';
import Fragment from 'react';
import UserDetails from './UserDetails';
import NewsDashboard from './NewsDashboard';
import PlayerStats from './PlayerStats';
import MatchInformation from './MatchInformation';
import { connect } from 'react-redux';
import '../../css/MyAccount.css';

class MyAccount extends React.Component {
	render() {
		console.log(this.props.userState);
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

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
return {
	userState: state.userState.userData
 }; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);  