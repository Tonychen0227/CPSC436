import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadNews } from '../../actions/index'
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
		return (
			<div>
				

			</div>
);
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
