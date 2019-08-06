import React from 'react';
import { connect } from 'react-redux';

class UserForumPosts extends React.Component {
	constructor(props){
		super(props);
		this.applyFilter = this.applyFilter.bind(this);
		this.createNew = this.createNew.bind(this);
		this.validateSubmission = this.validateSubmission.bind(this);
		this.state = {filter: ""};
	}

	validateSubmission() {
		this.setState({
			valid: this.state.newTitle.length > 10 && this.state.newTitle.length < 75
		})
	}

	createNew() {
		this.setState({
			discussionModal: false,
			newPostModal: true
		})
	}

	applyFilter(e) {
		this.setState({
			filter: event.target.value.toLowerCase()
		});
	}

	render() {
		var posts = [];
		for (var i = 0; i < this.props.forumState.full.filter(x => x.postTitle.toLowerCase().indexOf(this.state.filter) != -1).length; i++) {
			let element = this.props.forumState.full[i]
			posts.push(<a className='list-item' key={element._id} onClick={(i) => this.display(element._id)}><strong>{element.postTitle}</strong> By {element.userName} at {element.postedDate} UTC</a>);
		}
		var comments = [];
		if (this.props.forumState.selected != null) {
			var comments = this.props.forumState.selected.comments;
		}
		return (
			<div>
            {this.props.userState.DisplayName != undefined ? 
				<div><input type="submit" className="button is-success" value="Create new post" /> <br/></div>
				: <p> Must be logged in to create a post. </p>}
				<br/>
				<input className="input" type="text" value={this.state.value} onChange={this.applyFilter} placeholder="Filter by title"/>
				<br/>
				<br/>
				<div className="list is-hoverable">
					{posts}
				</div>
			</div>
);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return {
		userState: state.userState.userData,
		forumState: state.forumState
	}; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForumPosts);
