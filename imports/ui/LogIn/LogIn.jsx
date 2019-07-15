import React from 'react';
import MyAccount from './MyAccount';
import { connect } from 'react-redux';
import { userLogIn, userRegister, userReset, facebookLogIn } from '../../actions';
import '../../css/LogIn.css';
import FacebookLogin from 'react-facebook-login';

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LogIn extends React.Component {
	constructor() {
		super();
		this.state = { jwt: '', email: '', password: '', displayName: '', validEmail: false, validPassword: false };
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkValidity = this.checkValidity.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleUserReset = this.handleUserReset.bind(this);
		this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
	}

	responseFacebook(response) {
		this.props.facebookLogIn(response.id, response.email, response.accessToken)
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

	handleChangeDisplayName(e) {
		this.setState({
			displayName: event.target.value
		});
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
		this.props.userRegister(this.state.email, this.state.password, this.state.displayName)
	}

	handleUserReset() {
		this.props.userReset(this.state.email)
	}

	componentDidMount() {
		if (localStorage.getItem("CachedJWT")) {
			this.props.userLogIn(null, null, localStorage.getItem("CachedJWT"))
		}
	}

	//TODO: Implement facebook OAuth
	render() {
		if (!this.props.userState.isLoggedIn) {
			return (/*
					<div>
					<section className="hero is-link">
					  <div className="hero-body">
					    <div className="container">
					      <h1 className="title">
					        Welcome to login page!
					      </h1>
					    </div>
					  </div>
					</section>
						<h3> Login: </h3>
						<form onSubmit={this.handleSubmit} className="InputField">
			        <label>

								<p className="control has-icons-left has-icons-right">
				          <input type="email" className="input is-info is-medium" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
									<span className="icon is-medium is-left">
							      <i className="fas fa-envelope"></i>
							    </span>
								</p>
							</label>
							<br/>
							<label>

								<p className="control has-icons-left has-icons-right">
									<input type="password" className="input is-info is-medium" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword}/>
									<span className="icon is-medium is-left">
							      <i className="fas fa-lock"></i>
							    </span>
								</p>
							</label>
							<br/>
			        <input disabled={!this.state.validEmail || !this.state.validPassword} type="submit" value="Log Me In" />
							<button type="button" className="resetButton" disabled={!this.state.validEmail} onClick={this.handleUserReset} text="Reset Password">Reset Password</button>
					<span>{this.props.userState.loginAttempted > 0 ? "Login failed, attempted " + this.props.userState.loginAttempted + " times, try again":""}</span>
				  </form>
				  <p> or.... </p>
					<button disabled={!this.state.validEmail || !this.state.validPassword} onClick={this.handleRegister} text="Sign me up">Sign me up </button>
					<span> Optional display name: <input type="displayName" value={this.state.displayName} onChange={this.handleChangeDisplayName}/> </span>
					<br/>
					<span className="error">{this.props.userState.errorMessage ? "Error:" + this.props.userState.errorMessage :""}</span>
					<p> or.... </p>
					<FacebookLogin
						appId="322151111994092"
						autoLoad={false}
						fields="name,email,picture"
						cssClass="my-facebook-button-class"
						callback={this.responseFacebook} />
						</div>*/
				<section className="hero is-link is-fullheight">
					<div className="hero-body">
						<div className="container">
							<div className="columns is-centered">
								<div className="column is-5-tablet is-4-desktop is-3-widescreen">
									<form action className="box" onSubmit={this.handleSubmit}>
										<div className="field">
											<label htmlFor className="label">Email</label>
											<div className="control has-icons-left">
												<input type="email" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email" className="input" required />
												<span className="icon is-small is-left">
													<i className="fa fa-envelope" />
												</span>
											</div>
										</div>
										<div className="field">
											<label htmlFor className="label">Password</label>
											<div className="control has-icons-left">
												<input type="password" placeholder="*******" value={this.state.password} onChange={this.handleChangePassword} className="input" required />
												<span className="icon is-small is-left">
													<i className="fa fa-lock" />
												</span>
											</div>
										</div>
										<div className="field">
											<input className="button is-success" disabled={!this.state.validEmail || !this.state.validPassword} type="submit" value="Log Me In" />
											<span> </span>
											<button type="button" className="button is-danger" disabled={!this.state.validEmail} onClick={this.handleUserReset} text="Reset Password">
												Reset Password
													</button>
										</div>
										<br />
										<span>  <label htmlFor className="label">
											Optional display name: </label>
										</span>
										<div className="control has-icons-left">
											<input type="displayName" className="input" value={this.state.displayName} onChange={this.handleChangeDisplayName} />
											<span className="icon is-small is-left">
												<i className="fa fa-user" />
											</span>
										</div>
										<br />
										<button className="button is-warning" disabled={!this.state.validEmail || !this.state.validPassword} onClick={this.handleRegister} text="Sign me up">Sign me up </button>
										<br />
										<span className="error">{this.props.userState.errorMessage ? "Error:" + this.props.userState.errorMessage : ""}</span>
										<br />
										<div> ──────  or  ──────</div>
										<FacebookLogin
											appId="322151111994092"
											autoLoad={false}
											fields="name,email,picture"
											icon="fa-facebook"
											callback={this.responseFacebook} />
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			);
		} else {
			return (
				<MyAccount />
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
		userRegister: (email, password, displayName) => {
			dispatch(userRegister(email, password, displayName));
		},
		userReset: (email, password) => {
			dispatch(userReset(email));
		},
		facebookLogIn: (id, email, token) => {
			dispatch(facebookLogIn(id, email, token))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
