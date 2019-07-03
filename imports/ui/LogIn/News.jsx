import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadNews } from '../../actions/index'
import '../../css/News.css';
var Carousel = require('react-responsive-carousel').Carousel;
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
        <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[0].links.web.href} target="_blank">
                    <img src={this.props.news[0].images[0].url} />
                    <p className="legend">{this.props.news[0].headline}</p>
                </div>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[1].links.web.href} target="_blank">
                    <img src={this.props.news[1].images[1].url} />
                    <p className="legend">{this.props.news[1].headline}</p>
                </div>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[2].links.web.href} target="_blank">
                    <img src={this.props.news[2].images[2].url} />
                    <p className="legend">{this.props.news[2].headline}</p>
                </div>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[3].links.web.href} target="_blank">
                    <img src={this.props.news[3].images[3].url} />
                    <p className="legend">{this.props.news[3].headline}</p>
                </div>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[4].links.web.href} target="_blank">
                    <img src={this.props.news[4].images[4].url} />
                    <p className="legend">{this.props.news[4].headline}</p>
                </div>
                <div className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[5].links.web.href} target="_blank">
                    <img src={this.props.news[5].images[5].url} />
                    <p className="legend">{this.props.news[5].headline}</p>
                </div>
            </Carousel>
        /*
  			<div>
          <a className = "HeadNews" style={{display: "table-cell"}} href={this.props.news[0].links.web.href} target="_blank">
            <img src={this.props.news[0].images[0].url}></img>
            <div>{this.props.news[0].headline}</div>
          </a>
  			</div>*/
      );
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
