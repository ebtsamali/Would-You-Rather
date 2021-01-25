import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './utils/AuthRoute';
import { handleInitialData } from './actions/shared';
import LoadingBar from 'react-redux-loading';
import Nav from './components/Nav';
import Login from './components/Login';
import Questions from './components/Questions';
import LeaderBoared from './components/LeaderBoared';
import Question from './components/Question';
import NewQuestion from './components/NewQuestion';
import NotFound from './components/NotFound';


class App extends Component {

	componentDidMount () {
		this.props.dispatch(handleInitialData());
	}

	render () {
		return (
			<Router>
				<Fragment>
					<Nav />
					<LoadingBar />
					<Switch>
						<AuthRoute path='/' exact component={Questions} />
						<AuthRoute path='/add' exact component={NewQuestion} /> 
						<AuthRoute path='/leaderboard' exact component={LeaderBoared} /> 
						<AuthRoute path='/questions/:question_id' exact component={Question} />
						<Route path='/login' exact component={Login} /> 
						<Route component={NotFound} /> 
					</Switch>
				</Fragment>
			</Router>
		);
	}
}

export default connect()(App);