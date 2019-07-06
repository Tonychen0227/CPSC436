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

class NavBar extends Component {
  render(){
    return(
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item">
          <Link to='/home'><img className="NbaLogo" src="http://backgrounddownload.com/wp-content/uploads/2018/09/nba-logo-transparent-background.jpg" /></Link>
        </a>
      </div>
      <div class="navbar-menu is-dark">
        <div class="navbar-start">
          <a className="navbar-item">
            <Link to='/home'>Home</Link>
          </a>
          <a className="navbar-item">
            <Link to='/stats'>Stats</Link>
          </a>
          <a className="navbar-item">
            <Link to='/about'>About</Link>
            </a>
        </div>

        <div class="navbar-end">
          <a className="navbar-item">
            <Link to='/myAccount'>{this.props.isLoggedIn ? "My Account" : "Log In"} <br/>
            <button hidden={!this.props.isLoggedIn} onClick={this.props.logOut}>Log Out</button></Link>
          </a>
        </div>
      </div>
            
        <Route exact path='/home' component={Home}/>
        <Route exact path='/stats' component={Stats}/>
        <Route exact path='/myAccount' component={LogIn}/>
        <Route exact path='/about' component={About}/>
          
      </nav>
    )
  }
}
const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, isLoggedIn: state.userState.isLoggedIn, ensureRefresh: state.ensureRefresh}; //now it will appear as props
}

export default connect(mapStateToProps, {flipPage, logOut})(NavBar);
