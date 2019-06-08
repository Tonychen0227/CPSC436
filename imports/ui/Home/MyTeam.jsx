import React from 'react';
import { connect } from 'react-redux';
import LoremIpsum from '../LoremIpsum';
import '../../css/App.css';

class MyTeam extends React.Component {
  render(){
    return(
      <div>
        <h4 className = "myTeam">display info of my team</h4>
        <h5>choose a home team here, basic info of that team will be displayed here</h5>
        <LoremIpsum/>
      </div>
    );
  }
}
export default MyTeam;
