
export const SET_USERS = 'GET_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_answer';

export function setUsers (users) {
	return {
		type: SET_USERS,
		users
	}
}

export function addUserQuestion (user, qid) {
	return {
		type: ADD_USER_QUESTION,
		user,
		qid
	}
}

export function addUserAnswer (answer) {
	return {
		type: ADD_USER_ANSWER,
		answer
	}
}