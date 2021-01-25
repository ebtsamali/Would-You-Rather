import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { removeAuthedUser } from '../actions/authedUser';
import '../styles/nav.css';

class Nav extends Component {

	handleLogout = () => {
		const { handleRemoveAuthedUser, history } = this.props;
		handleRemoveAuthedUser();
		history.replace('/login');
	}

	render () {
		const { authedUser } = this.props;
		return (
			<nav className='nav'>
				<ul>
					<li>
						<NavLink to='/' exact activeClassName='active'> Home </NavLink>
					</li>
	
					<li>
						<NavLink to='/add' exact activeClassName='active'> New Question </NavLink>
					</li>
	
					<li>
						<NavLink to='/leaderboard' exact activeClassName='active'> Leader Board </NavLink>
					</li>
	
					{authedUser && <li className="user-data">
						<p>{authedUser.name}</p>
						<img src={authedUser.avatarURL} alt="user avatar" className="avatar" />
					</li>}

					{authedUser && <li>
						<button type="button" className="logout-btn" onClick={this.handleLogout}> Logout </button>
					</li>}
				</ul>
			</nav>
		);
	}
}

const mapStateToProps = ({authedUser, users}) => {
	const user = authedUser ? users[authedUser] : null ;
	return {
		authedUser: user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleRemoveAuthedUser: () => dispatch(removeAuthedUser())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));