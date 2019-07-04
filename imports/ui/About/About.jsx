import React from 'react';
import '../../css/About.css';
import { SocialIcon } from 'react-social-icons';

class About extends React.Component {
	render() {
		return (
			<div>
			<h1> About GGPanda </h1>
			<div className="main">
				<div className="profile">
				<img className="profile" src="https://www.myinstants.com/media/instants_images/1340305905201.png"/>
					<br/>
					<h6>TONY CHEN</h6>
					<p>这货不会写Front End</p>
					<SocialIcon url="https://github.com/Tonychen0227" target="_blank"/>
					<SocialIcon url="https://www.linkedin.com/in/tonychenubc/" target="_blank"/>
					<SocialIcon url="mailto:tony.chen@outlook.com" target="_blank"/>
				</div>
				<div className="profile">
				<img className="profile" src="https://tshop.r10s.com/56f/7ac/10fc/1770/5076/0a65/eb33/11b3e98312c45444889cef.jpg"/>
					<br/>
					<h6>PETER HAN</h6>
					<p>这货不会找女朋友</p>
					<SocialIcon url="https://github.com/CorneliusHan" target="_blank"/>
					<SocialIcon url="https://ca.linkedin.com/in/peter-han-7634b773?trk=pub-pbmap" target="_blank"/>
					<SocialIcon url="mailto: nottellingya@void.com" target="_blank"/>
				</div>
				<div className="profile">
				<img className="profile" src="https://www.myinstants.com/media/instants_images/1340305905201.png"/>
				<br/>
					<h6>YUTING WEN</h6>
					<p>这货不会打篮球</p>
					<SocialIcon url="https://github.com/Tonychen0227" target="_blank"/>
					<SocialIcon url="https://www.linkedin.com/in/tonychenubc/" target="_blank"/>
					<SocialIcon url="mailto:tony.chen@outlook.com" target="_blank"/>
				</div>
			</div>
			<h4> Basketball terminology for the non-basketball-savvy </h4>
			<h6> <strong>KD</strong>: Will never win a championship again </h6>
			</div>
);
	}
}

export default About;
