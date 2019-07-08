import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';

class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				
			</div>
		);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return { count: state.count }; //now it will appear as props
}

export default connect(mapStateToProps)(Home);
