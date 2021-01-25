import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';

class LeaderBoard extends Component {
	render () {
		const { usersIds } = this.props;
		return (
			<div className="container">
				<ul>
					{usersIds && usersIds.map(uid => (
						<li key={uid}>
							<UserCard id={uid} />
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = ({users}) => {
	/**
	* @description sort users descending by questions answered and questions created
	*/
	const sortFun = (a,b) => {
		return (users[b].questions.length + Object.keys(users[b].answers).length) - 
		(users[a].questions.length + Object.keys(users[a].answers).length) 
	}
	const usersIds = Object.keys(users).sort((a, b) => sortFun(a, b));
	return {
		usersIds
	}
}

export default connect(mapStateToProps)(LeaderBoard);