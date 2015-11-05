import React from 'react/addons';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import Auth from '../../services/AuthService.js';
import '!style!css!less!./Login.less';
import NakedHeader from '../NakedHeader/NakedHeader.js';
import RouterContainer from '../../services/RouterContainer'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		
		// this is getInitialState()
		this.state = {
			emailaddress: '',
			password: '',
			errors: '',
			server_error: false,
			server_error_msg: ''
		};
	}

	componentDidMount() {
		if (this.props.userLoggedIn == true)
			RouterContainer.get().transitionTo('/dashboard');

		$('.ui.form').form({
			fields: {
				email: {
					identifier  : 'emailaddress',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your e-mail'
					},
					{
						type   : 'email',
						prompt : 'Please enter a valid e-mail'
					}
					]
				},
				password: {
					identifier  : 'password',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your password'
					},
					{
						type   : 'length[6]',
						prompt : 'Your password must be at least 6 characters'
					}
					]
				}
			},
			inline: true,
			onFailure: this.handleInvalidForm.bind(this),
			onSuccess: this.handleValidForm.bind(this)
		});
	}

	login(setState) {
		Auth.login(this.state.emailaddress, this.state.password)
			.catch(function(err) {
				console.log("Error logging in", err);
				setState({server_error : true, server_error_msg: JSON.parse(err.response).error});
				$('html,body').scrollTop(0);
		});
	}

	handleInvalidForm(e) {
		this.setState({errors : e});
		return false;
	}

	handleValidForm(e) {
		e.preventDefault();
		this.setState({server_error : false});
		this.login(this.setState.bind(this));
	}

	serverError() {
		if (this.state.server_error == true) {
			return (
				<div className="ui middle aligned center aligned grid">
					<div className="column">
						<div className="ui red message"><b>Error:</b> {this.state.server_error_msg}</div>
					</div>
				</div>
			)
		}
	}

	render() { 
		return (
		<div id="login-component">
			<NakedHeader />
			{this.serverError()}
			<div className="ui middle aligned center aligned grid">
				<div className="column">
					<form className="ui large form" >
						<div className="ui stacked segment" >
							<div className="ui huge header" >
								<div className="content">Log in</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="user icon"></i>
									<input type="text" valueLink={this.linkState('emailaddress')} name="emailaddress" placeholder="E-mail address"/>
								</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="lock icon"></i>
									<input type="password" valueLink={this.linkState('password')} name="password" placeholder="Password"/>
								</div>
							</div>
							<div className="ui fluid big green submit button">Log in</div>
						</div>
					</form>

					<div className="ui message">
						First time here? <Link to="signup">Sign up</Link>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
