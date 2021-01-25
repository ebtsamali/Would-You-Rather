import { SET_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users';

export default function users (state={}, action) {
	switch (action.type) {
		case SET_USERS:
			return action.users;
		
		case ADD_USER_QUESTION :
			const { user, qid } = action;
			return {
				...state,
				[user]: {
					...state[user],
					questions: state[user].questions.concat([qid])
				}
			}

		case ADD_USER_ANSWER :
			const { authedUser, qid:id, answer } = action.answer;
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[id]: answer
					}
				}
			}

		default:
			return state;
	}
}