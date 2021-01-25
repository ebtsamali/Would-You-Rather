import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/questionCard.css';

class QuestionCard extends Component {

	render () {
		const { question, questionAuthor } = this.props;

		return (
			<div className="question-card">
				<div className="card-header">
					<h3>{questionAuthor.name}</h3>
				</div>
				<div className="card-body">
					<div className="card-avatar">
						<img src={questionAuthor.avatarURL} alt="user avatar" />
					</div>
					<div className="card-question-content">
						<h4>Would You Rather?</h4>
						<p>...{question.optionOne.text}...</p>
						<Link to={`/questions/${question.id}`} className="poll-link">View Poll</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ questions, users }, receivedProps) => {
	const question = questions[receivedProps.id];
	const questionAuthor = users[question.author];
	return {
		question,
		questionAuthor
	}
}

export default connect(mapStateToProps)(QuestionCard);