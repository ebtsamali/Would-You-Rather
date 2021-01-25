import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import '../styles/questions.css';

class Questions extends Component {

	state = {
		mode: "unanswered",
	}

	/**
	* @description set the mode to unanswered when user wants to show unanswered questions
	*/
	showUnansweredQuestions = () => {
		this.setState({
			mode: "unanswered",
		})
	}

	/**
	* @description set the mode to answered when user wants to show answered questions
	*/
	showAnsweredQuestions = () => {
		this.setState({
			mode: "answered",
		})
	}

	render () {
		const { mode } = this.state;
		const { questionsIds, authedUser } = this.props;

		//get the answered questions ids array
		const userAnsweredQuestions = Object.keys(authedUser.answers);

		//filter queations to get unanswered questions
		const unansweredQuestionIds = questionsIds.filter(
			id => !userAnsweredQuestions.includes(id)
		);

		//filter queations to get answered questions
		const answeredQuestionsIds = questionsIds.filter(
			id => userAnsweredQuestions.includes(id)
		);

		//check the mode to show the wanted questions(answered or unanswered)
		let showedQuestions = mode === "unanswered" ? unansweredQuestionIds : answeredQuestionsIds;

		return (
			<div className="container questions">
				<div className="questions-options">
					<button 
						type="button" 
						onClick={this.showUnansweredQuestions} 
						className={mode === 'unanswered' ? 'active-option' : 'other-option'}
					> Unanswered Question </button>
					<button 
						type="button" 
						onClick={this.showAnsweredQuestions}
						className={mode === 'answered' ? 'active-option' : 'other-option'}
					> Answered Question </button>
				</div>

				<div>
					<ul>
						{showedQuestions && showedQuestions.map(qid => (
							<li key={qid}>
								<QuestionCard id={qid} />
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ users, questions, authedUser }) => {
	return {
		questionsIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
		authedUser: users[authedUser]
	}
}

export default connect(mapStateToProps)(Questions);