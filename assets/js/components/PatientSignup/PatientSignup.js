import React from 'react/addons';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import Auth from '../../services/AuthService.js';
import '!style!css!less!./PatientSignup.less';
import NakedHeader from '../NakedHeader/NakedHeader.js';
import RouterContainer from '../../services/RouterContainer'

export default class PatientSignup extends React.Component {
	constructor(props) {
		super(props);
		
		// this is getInitialState()
		this.state = {
			firstname: '',
			lastname: '',
			emailaddress: '',
			password: '',
			errors: '',
			termschecked: false,
			server_error: false,
			server_error_msg: '',
			processing: false
		};
	}

	componentDidMount() {
		if (this.props.userLoggedIn == true)
			RouterContainer.get().transitionTo('/dashboard');

		$('.ui.checkbox').checkbox('enable');
		$('.ui.checkbox').checkbox('setting', 'onChange', this.handleCheckboxChange.bind(this));

		$('.ui.form').form({
			fields: {
				firstname: {
					identifier  : 'firstname',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a valid first name'
					}
					]
				},
				lastname: {
					identifier  : 'lastname',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a valid first name'
					}
					]
				},
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
				},
				tcbox: {
					identifier  : 'tcbox',
					rules: [
					{
						type   : 'checked',
						prompt : 'You must agree to the terms and conditions'
					},
					]
				}
			},
			inline: true,
			onFailure: this.handleInvalidForm.bind(this),
			onSuccess: this.handleValidForm.bind(this)
		});
	}

	signup(setState) {
		setState({processing: true});

		Auth.signup({
			user: { 
				first_name: this.state.firstname, 
				last_name: this.state.lastname,
				email_address: this.state.emailaddress,
				password: this.state.password
			},
			role: 0 // Patient
		})
		.catch(function(error) {
			setState({processing: false});
			error = JSON.parse(error.response);
			if (error.user.email_address)
				setState({server_error : true, server_error_msg: error.user.email_address});
			$('html,body').scrollTop(0);
		});
	}

	componentWillUnmount(e) {
		$('.ui.dropdown').dropdown('destroy');
		$('.ui.form').form('destroy');
	}

	handleInvalidForm(e) {
		this.setState({errors : e});
		return false;
	}

	handleCheckboxChange(e) {
		this.setState({termschecked : !this.state.termschecked});
	}

	handleValidForm(e) {
		e.preventDefault();
		this.setState({server_error : false});
		this.signup(this.setState.bind(this));
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
		var submitButtonClasses ="ui fluid big green submit button" + (this.state.processing == true ? " loading" : "");
		var checkBoxState = this.state.termschecked == true ? "checked" : "";

		return (
		<div id="signup-patient-component" >
			<NakedHeader />
			{this.serverError()}
			<div className="ui middle aligned center aligned grid">
				<div className="column">
					<form className="ui large form">
						<div className="ui stacked left aligned segment">
							<div className="ui huge center aligned header">
								<div className="content">Patient sign up</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="user icon"></i>
									<input type="text" valueLink={this.linkState('firstname')} name="firstname" placeholder="First name"/>
								</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="user icon"></i>
									<input type="text" valueLink={this.linkState('lastname')} name="lastname" placeholder="Last name"/>
								</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="user icon"></i>
									<input  type="text" valueLink={this.linkState('emailaddress')} name="emailaddress" placeholder="E-mail address"/>
								</div>
							</div>
							<div className="field">
								<div className="ui big left icon input" >
									<i className="lock icon"></i>
									<input  type="password" valueLink={this.linkState('password')} name="password" placeholder="Password"/>
								</div>
							</div>
							<div className="field">
								<div className="ui checkbox big">
									<input type="checkbox" checked={checkBoxState} name="tcbox" className="hidden"/>
									<label>I agree to the terms and conditions</label>
								</div>
							</div>
							<div className={submitButtonClasses}>Join</div>
						</div>
					</form>
					<div className="ui message">
						Already a member? <Link to="login">Log in</Link>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

ReactMixin(PatientSignup.prototype, React.addons.LinkedStateMixin);
