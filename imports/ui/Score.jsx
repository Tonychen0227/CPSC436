import React from 'react';
import { connect } from 'react-redux';
import '../css/App.css';

class Score extends React.Component {
  render(){
    return(
      <div>
        <h1 className = "home_team_score">This is where the score is being displayed</h1>
      </div>
    );
  }
}
export default Score;
