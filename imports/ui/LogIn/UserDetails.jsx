import React from 'react';
import '../../css/UserDetails.css';
import { connect } from 'react-redux';
//import ImageUploader from '../../ui/HackedReactImage';

class UserDetails extends React.Component {
	/*
	constructor(props) {
        super(props);
		this.state = { picture: null };
		this.onDrop = this.onDrop.bind(this);
	}

	
	onDrop(picture) {
		console.log(picture)
        this.setState({
            pictures: picture,
        });
	}
	*/
	
	render() {
		console.log(this.props.userState)
		return (
			<div>
			<h4> User Details for {this.props.userState.DisplayName} </h4>
			<div>
			<img className="profile" src={"data:image/jpeg;base64," + this.props.userState.ProfileBase64}/>
				<div> 
					<br/>
					<p> Favorite team: <img className="team" src={'logos/' + this.props.userState.FavoriteTeam + '.png'} alt={this.props.userState.FavoriteTeam}/> </p>
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