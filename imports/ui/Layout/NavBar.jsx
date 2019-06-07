import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/NavBar.css';
import {Navbar, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { flipPage } from '../../actions';

class NavBar extends Component {
  constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
    }

	handleClick(e) {
		event.preventDefault();
    this.props.flipPage(e);
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
            <Nav.Link className="button" onClick={() => this.handleClick(3)}>Log in</Nav.Link>
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
  return { pageNum: state.pageNum }; //now it will appear as props
}

export default connect(mapStateToProps, {flipPage})(NavBar);
