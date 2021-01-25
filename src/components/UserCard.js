import React from 'react';
import { connect } from 'react-redux';
import '../styles/userCard.css';

function UserCard({user}) {

	//calculate the answered Questions length
	const answeredQuestionsNums = Object.keys(user.answers).length;

	//calculate the created Questions length
	const createdQuestionsNums = user.questions.length;

	return (
		<div className="user-card">
			<div className="card-avatar">
				<img src={user.avatarURL} alt="user avatar" />
			</div>
			<div className="user-score-data">
				<h3>{user.name}</h3>
				<div className="questions-nums answered-questions">
					<p>Answered Questions</p>
					<p>{answeredQuestionsNums}</p>
				</div>
				<div className="questions-nums">
					<p>Created Questions</p>
					<p>{createdQuestionsNums}</p>
				</div>
			</div>
			<div className="card-total-score">
				<div className="score-card">
					<div className="card-header">
						<h3>Score</h3>
					</div>
					<div className="score">
						<p>{answeredQuestionsNums + createdQuestionsNums}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({users}, {id}) => {
	return {
		user: users[id]
	}
}

export default connect(mapStateToProps)(UserCard);