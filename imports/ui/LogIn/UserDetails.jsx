import React from 'react';
import '../../css/UserDetails.css';
import { connect } from 'react-redux';
import { userUploadProfilePicture } from '../../actions';
import ImageUploader from './ImageUploader';

class UserDetails extends React.Component {
	constructor(props) {
        super(props);
		this.state = { picture: null };
		this.onDrop = this.onDrop.bind(this);
		this.sendImage = this.sendImage.bind(this);
	}

	sendImage(base64) {
		base64 = base64.split('base64,')[1];
		this.props.userUploadProfilePicture(this.props.userState.Email, this.props.userState.Password, base64)
	}
	
	onDrop(picture) {
		var reader  = new FileReader();
		reader.readAsDataURL(picture[0]);
		reader.onload = () => this.sendImage(reader.result);
	}
	
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
				<ImageUploader
                buttonText='Upload new image'
                onChange={this.onDrop}
            />
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
		userUploadProfilePicture: (email, password, ProfileBase64) => {
			dispatch(userUploadProfilePicture(email, password, ProfileBase64));
		}
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);