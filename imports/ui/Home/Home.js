import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions';
import MyMVP from './MyMVP';
import MyTeam from './MyTeam';
import MyMVPStats from './MyMVPStats';
import MyTeamStats from './MyTeamStats';
import News from './News'
import '../../css/App.css';

class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<h1> Welcome to your home page </h1>
				<div className="top">
					<div className="News">
						<News />
					</div>
				</div>
				<div className="left">
					<div className="myMVP">
							<MyMVP />
					</div>

					<div className="myTeam">
							<MyTeam />
					</div>
				</div>

				<div className="right">
					<div className="myMVPStats">
						<MyMVPStats />
					</div>
					<div className="myTeamStats">
						<MyTeamStats />
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

export default connect(mapStateToProps, {increment})(Home);
