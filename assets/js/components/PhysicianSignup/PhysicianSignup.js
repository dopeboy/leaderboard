import React from 'react/addons';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import Auth from '../../services/AuthService.js';
import '!style!css!less!./PhysicianSignup.less';
import NakedHeader from '../NakedHeader/NakedHeader.js';
import RouterContainer from '../../services/RouterContainer'

export default class PhysicianSignup extends React.Component {
	constructor(props) {
		super(props);
		
		// this is getInitialState()
		this.state = {
			firstname: '',
			lastname: '',
			degrees: '',
			specialities: [],
			emailaddress: '',
			password: '',
			errors: '',
			server_error: false,
			server_error_msg: '',
			processedSpecialities: null,
			processing: false
		};
	}

	componentDidMount() {
		$('.ui.checkbox').checkbox('enable');
		$('.ui.checkbox').checkbox('setting', 'onChange', this.handleCheckboxChange.bind(this));

		$.get('/specialities', function(result) {
			this.setState({
				processedSpecialities: this.processSpecialities(JSON.parse(result))
			});
		}.bind(this));

		// If the user is already logged in, pass them straight to the
		// dashboard
		if (this.props.userLoggedIn == true)
			RouterContainer.get().transitionTo('/dashboard');

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
				degrees: {
					identifier  : 'degrees',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a degree / suffix'
					}
					]
				},
				specialities: {
					identifier  : 'specialities',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter atleast one speciality'
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

		$('#specialities.dropdown').dropdown({
			onChange: this.specialityClickHandler.bind(this)
		});
	}

	handleCheckboxChange(e) {
		this.setState({termschecked : !this.state.termschecked});
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
			degrees: this.state.degrees,
			specialities: this.state.specialities,
			role: 1 // Physician
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

	handleValidForm(e) {
		e.preventDefault();
		this.signup(this.setState.bind(this));
	}

	specialityClickHandler(e) {
		if (e === "")
			this.setState({specialities: []})
		
		else { 
			var individualSpecialities = e.split(',');
			var s = []
			for (var i=0; i<individualSpecialities.length; ++i) {
				s.push({'speciality_uuid': individualSpecialities[i]});
			}
			this.setState({specialities : s});
		}
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

	processSpecialities(specialities_data) {
		return (
			specialities_data.map(function(s, i) {
				  return [<div className="header">{s.speciality_type_name}</div>,
							s.specialities.map(function(t, i) {
							return <div className="item" data-value={t.speciality_uuid}>{t.speciality_name}</div>
								}),     <div className="divider"></div>
				  ]
			}))
	}

	render() { 
		var formClasses = "ui large form" + (this.state.processedSpecialities == null ? " loading" : "");
		var submitButtonClasses ="ui fluid big green submit button" + (this.state.processing == true ? " loading" : "");
		var checkBoxState = this.state.termschecked == true ? "checked" : "";

		return (
		<div id="signup-physician-component" >
			<NakedHeader />
			{this.serverError()}
			<div className="ui middle aligned center aligned grid">
				<div className="column">
					<form className={formClasses}>
						<div className="ui stacked left aligned segment">
							<div className="ui huge center aligned header">
								<div className="content">Physician sign up</div>
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
									<input type="text" valueLink={this.linkState('degrees')} name="degrees" placeholder="Degrees (comma separated)"/>
								</div>
							</div>

							<div className="field">
								<div id="specialities" className="ui big fluid multiple search selection dropdown">
								  <input type="hidden" name="specialities"/>
								  <i className="dropdown icon"></i>
								  <div className="default text">Specialties (select multiple)</div>
									  <div className="menu" tabIndex="-1">
										{this.state.processedSpecialities}
										</div>  
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
								<div className="ui big checkbox">
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

ReactMixin(PhysicianSignup.prototype, React.addons.LinkedStateMixin);
