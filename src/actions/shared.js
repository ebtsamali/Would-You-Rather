import { getInitialData } from '../utils/api';
import { setQuestions } from './questions';
import { setUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getInitialData().then(( {users, questions} ) => {
			dispatch(setUsers(users));
			dispatch(setQuestions(questions));
			dispatch(hideLoading());
		})
	}
}