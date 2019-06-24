import React from 'react';
import { connect } from 'react-redux';
import LoremIpsum from '../LoremIpsum';
import '../../css/App.css';

class MyMVP extends React.Component{
  render(){
    return (
      <div>
        <h4 className = "myMVP">display info of my MVP</h4>
        <h5>display the profile of the player</h5>
      </div>
    );
  }
}

export default MyMVP;
