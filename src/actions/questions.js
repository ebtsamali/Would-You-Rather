import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { addUserQuestion, addUserAnswer } from './users';

export const SET_QUESTIONS = 'SET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_VOTE = 'ADD_VOTE';

export function setQuestions (questions) {
	return {
		type: SET_QUESTIONS,
		questions
	}
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion (optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());
		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser
		}).then (question => {
			dispatch(addQuestion(question));
			dispatch(addUserQuestion(authedUser, question.id));
		}).then(() => {
			dispatch(hideLoading());
		})
	}
}

function addQuestionAnswer(answer) {
	return {
		type: ADD_VOTE,
		answer
	}
}

export function handleSaveAnswer (qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		const answerData = {
			authedUser,
			qid,
			answer
		}
		dispatch(showLoading());
		return saveQuestionAnswer(answerData).then (() => {
			dispatch(addQuestionAnswer(answerData));
			dispatch(addUserAnswer(answerData));
		}).then(() => {
			dispatch(hideLoading());
		})
	}
}