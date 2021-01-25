import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import '../styles/newQuestion.css';

class NewQuestion extends Component {

	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false,
	}

	handleChangeOptionOne = (e) => {
		this.setState({
			optionOne: e.target.value
		})
	}

	handleChangeOptionTwo = (e) => {
		this.setState({
			optionTwo: e.target.value
		})
	}

	/**
	* @description submit create new question form and dispatch handleAddQuestion
	*/
	handlesubmit = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;

		if (optionOne !== '' && optionTwo !== '') {
			const { dispatch } = this.props;
			dispatch(handleAddQuestion(optionOne, optionTwo));
			this.setState({
				optionOne: '',
				optionTwo: '',
				toHome: true
			})
		}
	}

	render () {
		const { optionOne, optionTwo, toHome } = this.state;

		if (toHome) {
			return <Redirect to="/" />
		}

		return (
			<div className="container">
				<div className="card-header">
					<h3>Create New Question</h3>
				</div>
				<div className="new-question-content">
					<p>Complete the Question</p>
					<h4>Would You Rather?</h4>
					<form onSubmit={this.handlesubmit}>
						<input 
							type="text" 
							placeholder="Enter option one text here" 
							value={optionOne}
							onChange={this.handleChangeOptionOne}
							required 
						/>
						<h3>OR</h3>
						<input 
							type="text" 
							placeholder="Enter option two text here" 
							value={optionTwo} 
							onChange={this.handleChangeOptionTwo}
							required 
						/>
						<button 
							type="submit" 
							className="submit-btn"
							disabled={!optionOne || !optionTwo}
						>Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default connect()(NewQuestion);