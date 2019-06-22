import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadNews } from '../../actions/index'
import '../../css/News.css';
class News extends React.Component {

  componentDidMount(){
    const parent = this;
    parent.callApi()
    .then(res => parent.props.loadNews(res))
    .catch(err => console.log(err));
    }

  callApi = async () => {
    const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news');
    const body = await response.json();
    if(response.status !== 200){throw Error(body.message)}
    console.log(body);
    return body;
  }

	render() {
    console.log("In the news component");
    console.log(this.props.news);
    var key = 0;
    if(this.props.news && (this.props.news).length){
      return (
  			<div>
          <a className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[0].links.web.href} target="_blank">
            <img src={this.props.news[0].images[0].url}></img>
            <div>{this.props.news[0].headline}</div>
          </a>
  			</div>);
    }else {
      return (<div>Loading News</div>);
		}
  }
}

function mapStateToProps(state){ //name is by convention
	//state has entire state of app!!
return { news: state.news}; //now it will appear as props
};

const mapDispatchToProps = dispatch => ({
  loadNews: (news) => dispatch(loadNews(news))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
