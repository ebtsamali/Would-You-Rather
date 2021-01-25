import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/questions';
import '../styles/question.css';

class Question extends Component {

	state = {
		vote: null
	}

	handleChangeVote = (e) => {
		this.setState({
			vote:  e.target.value
		})
	}

	/**
	* @description submit question answer and dispatch handleSaveAnswer
	*/
	handlesubmit = (e) => {
		e.preventDefault();
		const { dispatch, question } = this.props;
		const { vote } = this.state;
		dispatch(handleSaveAnswer(question.id, vote));
	}

	/**
	* @description check if authedUser answered on the question or not
	* @param {object} question => {optionOne, optionTwo}
	* @param {string} authedUser
	* @returns {boolean} true(answered) or false(unanswered)
	*/
	checkQuestion = ({optionOne, optionTwo}, authedUser) => {
		return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
	}

	render () {
		const { question, author, authedUser } = this.props;

		if (!question) {
			return <Redirect to="/notfound" />
		}

		// question status (answered or not by authedUser)
		const status = this.checkQuestion(question, authedUser) ? 'answered' : 'unanswered';

		//destructure votes and text from optionOne and optionTwo
		const { votes:optionOneVotes, text:optionOneText } = question.optionOne;
		const { votes:optionTwoVotes, text:optionTwoText } = question.optionTwo;

		return (
			<div className="container">
				<div className="card-header">
					<h3>Asked By {author.name}</h3>
				</div>
				<div className="card-body">
					<div className="card-avatar">
						<img src={author.avatarURL} alt="user avatar" />
					</div>
					<div className="card-question-content">
						{/** if authedUser unanswered the question, show the question options form */}
						{status === "unanswered" && <form onSubmit={this.handlesubmit}>
							<h4>Would You Rather?</h4>
							<div className="option-input">
								<input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.handleChangeVote} />
								<label htmlFor="optionOne">{optionOneText}</label>
							</div>
							<div className="option-input">
								<input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.handleChangeVote} />
								<label htmlFor="optionTwo">{optionTwoText}</label>
							</div>
							<button type="submit" className="submit-btn" disabled={!this.state.vote}>Submit</button>
						</form>}

						{/** if authedUser answered the question, show the question votes details */}
						{status === "answered" && <Fragment>
							<h3>Results</h3>
							<div className="option-card">
								<h4>{optionOneText}</h4>
								{optionOneVotes.includes(authedUser) && <p className="user-vote">your vote</p>}
								<p>{Math.round((optionOneVotes.length / (optionOneVotes.length + optionTwoVotes.length))*100)}%</p>
								<meter value={optionOneVotes.length} min="0" max={optionOneVotes.length + optionTwoVotes.length}></meter>
								<p>{optionOneVotes.length} out of {optionOneVotes.length + optionTwoVotes.length} votes </p>
							</div>
							<div className="option-card">
								<h4>{optionTwoText}</h4>
								{optionTwoVotes.includes(authedUser) && <p className="user-vote">your vote</p>}
								<p>{Math.round((optionTwoVotes.length / (optionOneVotes.length + optionTwoVotes.length))*100)}%</p>
								<meter value={optionTwoVotes.length} min="0" max={optionOneVotes.length + optionTwoVotes.length}></meter>
								<p>{optionTwoVotes.length} out of {optionOneVotes.length + optionTwoVotes.length} votes </p>
							</div>
						</Fragment>}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({questions, users, authedUser}, {match}) => {
	const qid = match.params.question_id;
	const question = questions[qid];

	return {
		question,
		author: question ? users[question.author] : null,
		authedUser
	}
}

export default connect(mapStateToProps)(Question);