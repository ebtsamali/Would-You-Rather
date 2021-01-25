import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends Component {
	render () {
		const { authedUser, location } = this.props;
		if (authedUser) {
			return <Route {...this.props} />
		} else {
			return <Redirect 
				to={{
					pathname: "/login",
					state: { requestedURL: location.pathname }
				}}
			/>
		}
	}
}

const mapstateToProps = state => {
	return {
		authedUser: state.authedUser
	}
}

export default connect(mapstateToProps)(AuthRoute);