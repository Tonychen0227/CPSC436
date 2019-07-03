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

class App extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }

	componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  /*componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }*/
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

	render() {
		var dynamicComponent;
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
		<NavBar
			{...this.props}
			bgColor={this.state.backgroundColor}
			activeColor={this.state.activeColor}/>
		{dynamicComponent}
		</div>
		</LoadingOverlay>
	);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, loading: state.loading }; //now it will appear as props
}


export default connect(mapStateToProps)(App);
