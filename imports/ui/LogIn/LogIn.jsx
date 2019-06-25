import React from 'react';
import Fragment from 'react';
import MyAccount from './MyAccount';
import { connect } from 'react-redux';
import { userLogIn, userRegister } from '../../actions';
import '../../css/LogIn.css';

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LogIn extends React.Component {
	constructor() {
		super();
		this.state = {jwt: '', email: '', password: '', validEmail: false, validPassword: false};
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkValidity = this.checkValidity.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleChangeEmail(e) {
		this.setState({
			email: event.target.value
		});
		this.checkValidity(event.target.value, this.state.password)
	}

	handleChangePassword(e) {
		this.setState({
			password: event.target.value
		});
		this.checkValidity(this.state.email, event.target.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLogIn(this.state.email, this.state.password, this.state.jwt)
	}

	checkValidity(email, password) {
		var match = re.test(email)
		if (match) {
			this.setState({
				validEmail: true
			})
		} else {
			this.setState({
				validEmail: false
			})
		}
		if (password.length >= 8) {
			this.setState({
				validPassword: true
			})
		} else {
			this.setState({
				validPassword: false
			})
		}
	}

	handleRegister() {
		this.props.userRegister(this.state.email, this.state.password)
	}

	render() {
		console.log(this.props.userState);
		if (!this.props.userState.isLoggedIn) {
			return (
					<div>
						<h1> Welcome to login page! </h1>
						<h3> Login: </h3>
						<form onSubmit={this.handleSubmit} className="InputField">
			        <label>
			          Email:
			          <input type="text" onChange={this.handleChangeEmail}/>
								<span>{!this.state.validEmail ? "Input valid email pls":""}</span>
			        </label>
							<br/>
							<label>
								Password:
								<input type="password" onChange={this.handleChangePassword}/>
								<span>{!this.state.validPassword ? "Input valid password pls (8+ chars)":""}</span>
							</label>
							<br/>
			        <input disabled={!this.state.validEmail || !this.state.validPassword} type="submit" value="Log Me In" />
					<span>{this.props.userState.loginAttempted > 0 ? "Login failed, attempted " + this.props.userState.loginAttempted + " times, try again":""}</span>
				  </form>
				  <p> or.... </p>
					<button disabled={!this.state.validEmail || !this.state.validPassword} onClick={this.handleRegister} text="Sign me up">Sign me up </button>
					<span>{this.props.userState.errorMessage ? "Error:" + this.props.userState.errorMessage :""}</span>
						</div>
			);
		} else {
			return (
				<MyAccount/>
			);
		}
	};
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
return {
	userState: state.userState
 }; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
  return {
    userLogIn: (email, password, jwt) => {
      dispatch(userLogIn(email, password, jwt));
	},
	userRegister: (email, password) => {
	dispatch(userRegister(email, password));
	}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
