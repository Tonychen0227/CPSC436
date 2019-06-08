import React from 'react';
import { connect } from 'react-redux';
import '../css/App.css';

class News extends React.Component{
  render(){
    return (
      <div>
        <h1  className = "home_team_news">This is where the news is being displayed</h1>
      </div>
    );
  }
}

export default News;
