import React from 'react';
import LoremIpsum from '../LoremIpsum';
import '../../css/UserDetails.css';

class UserDetails extends React.Component {
	render() {
		return (
			<div>
			<h4> User Details </h4>
			<div>
			<img className="profile" src="https://www.myinstants.com/media/instants_images/1340305905201.png"/>
				<LoremIpsum/>
			</div>
			<LoremIpsum/>
			</div>
);
	}
}

export default UserDetails;
