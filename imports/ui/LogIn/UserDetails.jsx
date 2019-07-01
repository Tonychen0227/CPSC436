import React from 'react';
import LoremIpsum from '../LoremIpsum';
import '../../css/UserDetails.css';
import { connect } from 'react-redux';

class UserDetails extends React.Component {
	render() {
		console.log(this.props.userState)
		/*
		AccountCreated: "7/1/2019"
		DisplayName: "I love JavaScript XD"
		Email: "tonychenrocks@hotmail.com"
		FavoriteTeam: ""
		JWTIssued: "Mon, 01 Jul 2019 15:24:56 GMT"
		JWTToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbnljaGVucm9ja3NAaG90bWFpbC5jb20iLCJpYXQiOjE1NjE5OTQ2OTYsImV4cCI6MTU2MjA4MTA5Nn0.dpuA49n5WSoZBlKvhfeXUgnN-WltxNaIAY6yhhDlB1g"
		Password: "8772115f705abfa74e6ac0bd8a513bdd0e5ed58c8d899d0d3df867f51a583d1e"
		ProfileBase64: ""
		ResetToken: "BpSOHYI2r0"
		SpecialPermissions: ""
		Validated: true
		ValidationToken: "swWaNIc9c"
		_id: "5d1a24a69792904700c5dc1a"
		*/
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