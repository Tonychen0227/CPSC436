import React from 'react';
import '../../css/App.css';
import Home from '../Home/Home';
import Stats from '../Stats/Stats';
import LogIn from '../LogIn/LogIn';
import NavBar from './NavBar';
import About from '../About/About';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import PerfectScrollbar from "perfect-scrollbar";
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

	render() {
		/*var dynamicComponent;
		switch(this.props.pageNum) {
		  case 1:
		    // code block
				dynamicComponent = <Home/>
		    break;
		  case 2:
		    // code block
				dynamicComponent = <Stats/>
		    break;
			case 3:
				dynamicComponent = <LogIn/>
				break;
		  default:
				dynamicComponent = <About/>
		}
		return (
	<LoadingOverlay
		active={this.props.loading}
		spinner
		text='Loading your content...'>
		<div>
		<BrowserRouter>
			<div>
				<NavBar />
			</div>
		</BrowserRouter>
		{dynamicComponent}
		</div>
		</LoadingOverlay>
	);*/
	return(
		<BrowserRouter>
			<div>
				<NavBar />
			</div>
		</BrowserRouter>
	);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, loading: state.loading }; //now it will appear as props
}


export default connect(mapStateToProps)(App);
