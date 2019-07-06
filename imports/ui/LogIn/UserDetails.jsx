import React from 'react';
import LoremIpsum from '../LoremIpsum';
import '../../css/UserDetails.css';
import { connect } from 'react-redux';

class UserDetails extends React.Component {
	render() {
		console.log(this.props.userState)
		return (
			<div>
			<h4> User Details for {this.props.userState.DisplayName} </h4>
			<div>
			<img className="profile" src="https://www.myinstants.com/media/instants_images/1340305905201.png"/>
				<div> 
					<br/>
					<p> User ID: {this.props.userState._id} </p>
					<p> Favorite team: {this.props.userState.FavoriteTeam} <img className="team" src="../../Assets/logos/raptors.png"/> </p>
					<p> Account Created: {this.props.userState.AccountCreated} </p>
					<p> Account Type: {this.props.userState.Password == "Facebook"? "Facebook":"Email/Password"} </p>
					<br/>
				</div>
			</div>
			</div>
);
	}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);