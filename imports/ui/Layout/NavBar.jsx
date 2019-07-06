import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
//import '../../css/NavBar.css';
import { Link, Route } from 'react-router-dom';
//import {Navbar, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { flipPage, logOut } from '../../actions';
import Home from '../Home/Home';
import Stats from '../Stats/Stats';
import LogIn from '../LogIn/LogIn';
import About from '../About/About';
import "../../../node_modules/bulma/css/bulma.css";


/*
class NavBar extends Component {
  constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    }

	handleClick(e) {
		event.preventDefault();
    this.props.flipPage(e);
	}

  handleLogOut() {
    this.props.logOut();
  }

  render() {
    return (
      <div>
      <Navbar className="nav_back" bg="light" expand="lg">
        <Navbar.Brand onClick={() => this.handleClick(1)}>
          <img className="NbaLogo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="button" onClick={() => this.handleClick(1)}>Home</Nav.Link>
            <Nav.Link className="button" onClick={() => this.handleClick(2)}>Stats</Nav.Link>
            <Nav.Link className="button" onClick={() => this.handleClick(3)}>{this.props.isLoggedIn ? "My Account" : "Log In"} <br/>
            <button hidden={!this.props.isLoggedIn} onClick={this.handleLogOut}> Log Out </button> </Nav.Link>
            <Nav.Link className="button" onClick={() => this.handleClick(69420)}>About GGPanda</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, isLoggedIn: state.userState.isLoggedIn, ensureRefresh: state.ensureRefresh}; //now it will appear as props
}

export default connect(mapStateToProps, {flipPage, logOut})(NavBar);*/
class NavBar extends Component {
  render(){
    return(
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to='/home'><img className="NbaLogo" src="http://backgrounddownload.com/wp-content/uploads/2018/09/nba-logo-transparent-background.jpg" /></Link>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to='/home'>Home</Link>
          </div>
          <div className="navbar-item">
            <Link to='/stats'>Stats</Link>
          </div>
          <div className="navbar-item">
            <Link to='/about'>About</Link>
          </div>
          <div className="navbar-item">
            <Link to='/myAccount'>{this.props.isLoggedIn ? "My Account" : "Log In"} </Link>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to='/home'><button hidden={!this.props.isLoggedIn} onClick={this.props.logOut}>Log Out</button></Link>
          </div>
        </div>
      </div>

      </nav>
      /*
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width={112} height={28} />
          </a>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>
            <a className="navbar-item">
              Documentation
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
                </a>
                <a className="navbar-item">
                  Jobs
                </a>
                <a className="navbar-item">
                  Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>*/
    )
  }
}
const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, isLoggedIn: state.userState.isLoggedIn, ensureRefresh: state.ensureRefresh}; //now it will appear as props
}

export default connect(mapStateToProps, {flipPage, logOut})(NavBar);
