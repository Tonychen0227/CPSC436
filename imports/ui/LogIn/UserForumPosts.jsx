import React from 'react';
import { connect } from 'react-redux';

class UserForumPosts extends React.Component {
	render() {
		return (
            <div>
            <h4>{this.props.userState.DisplayName}'s forum posts </h4>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor mollis tellus ac varius. Quisque porta nulla id sapien ultrices faucibus. Integer aliquet, tortor ut porta efficitur, purus nisl rhoncus mauris, malesuada finibus metus nisi a orci. Donec aliquet ligula et nunc euismod suscipit. Nullam vel turpis ex. Aenean ultricies turpis sit amet nisl fermentum, sed tincidunt arcu pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat erat a lacinia efficitur. </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserForumPosts);
