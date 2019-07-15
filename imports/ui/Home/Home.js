import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';
import '../../css/MyAccount.css';
import NewsDashboard from '../LogIn/NewsDashboard'
class Home extends React.Component {
	render() {
		return (
			<div className="Home">
			<section className="hero is-link">
			  <div className="hero-body">
			    <div className="container">
			      <h1 className="title">
			        Home
			      </h1>
			    </div>
			  </div>
			</section>
				<div className="center">
					<div className="newsDashboard inner">
						<NewsDashboard/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return { count: state.count }; //now it will appear as props
}

export default connect(mapStateToProps)(Home);
