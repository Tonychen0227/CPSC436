import React from 'react';
import '../css/App.css';
import Home from './Home';
import Stats from './Stats';
import LogIn from './LogIn';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import { connect } from 'react-redux';

class App extends React.Component {
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
				dynamicComponent = <AboutUs/>
		}
		return (
	<div>
	<NavBar/>
	{dynamicComponent}
	</div>
	);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum }; //now it will appear as props
}


export default connect(mapStateToProps)(App);

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
