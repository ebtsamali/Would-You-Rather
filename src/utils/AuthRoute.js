import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends Component {
	render () {
		const { authedUser } = this.props;
		if (authedUser) {
			return <Route {...this.props} />
		} else {
			return <Redirect to='/login' />
		}
	}
}

const mapstateToProps = state => {
	return {
		authedUser: state.authedUser
	}
}

export default connect(mapstateToProps)(AuthRoute);