import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select, {components} from 'react-select';
import { setAuthedUser } from '../actions/authedUser';
import '../styles/login.css';

class Login extends Component {

	state = {
		selectedUser: null
	}

	/**
	* @description handle change selected user to login
	* @param {object} selectedUser
	*/
	handleChangeUser = selectedUser => {
		this.setState({ selectedUser });
	}

	/**
	* @description submit login form and navigate to home page
	* @param {object} e(event)
	*/
	handleSubmit = e => {
		e.preventDefault();
		const { handleLogin, history, location } = this.props;
		const requestedURL = location.state ? location.state.requestedURL : '/';
		const { selectedUser } = this.state;
		handleLogin(selectedUser.value);
		history.replace(requestedURL);
	}

	render () {
		const { users } = this.props;
		console.log(this.props);

		/**
		* @description map on users to set select input options
		*/
		const options = users.map(user => {
			return {value: user.id, label: user.name, avatar: user.avatarURL}
		});

		/**
		* @description create select custom option to can show avatar and user name
		*/
		const { Option } = components;
		const IconOption = (props) => {
			return (
				<Option {...props}>
						<img src={props.data.avatar} style={{width:30, marginRight:10}} alt="avatar" />
						{props.data.label}
				</Option>
			)
		}

		return (
			<div className="container login">
				<div className="login-card-header">
					<h3>Welcome to the WUOLD YOU RATHER App!</h3>
					<p>Please Sign in to continue</p>
				</div>
				<div className="login-card-body">
					<img src="../../img/logo.jpg" alt="app-logo" className="app-logo" />
					<h2>Login</h2>
					<form className="login-form" onSubmit={this.handleSubmit}>
						<Select
							className="user-select"
							placeholder="Select User"
							value={this.state.selectedUser}
							onChange={this.handleChangeUser}
							options={options}
							components={{ Option: IconOption}}
						/>
						<button type="submit"> Sign in </button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({users}) => {
	return {
		users: Object.values(users)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleLogin: id => dispatch(setAuthedUser(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);