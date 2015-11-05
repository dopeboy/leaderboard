import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import AuthenticatedComponent from '../AuthenticatedComponent/AuthenticatedComponent'
import '!style!css!less!./EditPhysicianProfile.less';
import cookie from 'react-cookie';
import RouterContainer from '../../services/RouterContainer'
import when from 'when'
import ReactMixin from 'react-mixin';

var editPhysicianProfile = class EditPhysicianProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			degrees: '',
			specialities: [],
			address: '',
			city: '',
			state: '',
			country: '',
			affiliated_hospitals: '',
			errors: '',
			server_error: false,
			server_error_msg: '',
			processing: false,
			processedSpecialities: null,
			received_specialities: false,
			received_user_profile: false,
			loadedSpecialitiesIntoMenu: false
		};
	}

	componentDidMount() { 
		$.get('/specialities', function(result) {
			this.setState({
				processedSpecialities: this.processSpecialities(JSON.parse(result)),
				received_specialities: true
			});
		}.bind(this));

		this.props.makeAuthRequest(
				"/physicians/" + this.props.params.userID,
				"GET",
				null
				).then(function(response) {
			this.setState({
				received_user_profile: true,
				firstname: response.user.first_name,
				lastname: response.user.last_name,
				degrees: response.degrees,
				address: response.user.address,
				city: response.user.city,
				state: response.user.state,
				country: response.user.country,
				affiliated_hospitals: response.affiliated_hospitals,
				specialities: response.specialities
			});
		}.bind(this));

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

		// No click handler because we're going to programatically
		// add elements later
		$('#specialities.dropdown').dropdown({
		});

	}

	// Check if we've received all the date and that we haven't loaded the elements yet
	// Then load the elements, attach the click handler, then set the flag
	// that we've loaded the specialities
	componentDidUpdate(e) {
		if (this.state.loadedSpecialitiesIntoMenu === false  && this.state.received_specialities === true 
				&& this.state.received_user_profile === true) {
			var my_specialities = [];
			this.state.specialities.forEach(function(entry) { 
				my_specialities.push(entry.speciality_uuid);
			});
			$('#specialities.dropdown').dropdown('set exactly', my_specialities);

			$('#specialities.dropdown').dropdown({
				onChange: this.specialityClickHandler.bind(this)
			});

			this.setState({loadedSpecialitiesIntoMenu: true})
		}
	}

	componentWillUnmount(e) {
		$('.ui.dropdown').dropdown('destroy');
		$('.ui.form').form('destroy');
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

	handleInvalidForm(e) {
		this.setState({errors : e});
		return false;
	}

	updatePhysicianProfile(setState) {
		setState({processing: true});

		this.props.makeAuthRequest(
			"/physicians/" + this.props.params.userID,
			"PUT",
			{
				user: { 
					address: this.state.address,
					city: this.state.city,
					state: this.state.state,
					country: this.state.country,
				},
				specialities: this.state.specialities,
				degrees: this.state.degrees,
				affiliated_hospitals: this.state.affiliated_hospitals,
			}
		).then(function(response) {
			if (response.status >= 400) {
				this.setState({processing: false});
				var error = JSON.parse(response.response);
				if (error.user.error)
					setState({server_error : true, server_error_msg: error.user.error[0]});
				$('html,body').scrollTop(0);
			}
			else
				RouterContainer.get().transitionTo('/physician-profile/' + this.props.params.userID);
		}.bind(this));
	}

	handleValidForm(e) {
		e.preventDefault();
		this.setState({server_error : false});
		this.updatePhysicianProfile(this.setState.bind(this));
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

	loader() {
		if (this.state.received_specialities === false || this.state.received_user_profile === false) { 
			return this.props.showLoader();
		}

		else {
			return this.props.hideLoader();
		}
	}

	serverError() {
		if (this.state.server_error == true) {
			return (
					<div>
						<div className="ui red message"><b>Error:</b> {this.state.server_error_msg}</div>
					</div>
			)
		}
	}

	render() {
		var formClasses = "ui form" + ((this.state.received_specialities === true && this.state.received_user_profile === true) ? "" : " loading");
		var submitButtonClasses ="ui green submit button" + (this.state.processing == true ? " loading" : "");

		return (
			<div id="edit-physician-profile-component"> 
				<Helmet title="Edit profile" />
				<div className="ui main container">
					{this.serverError()}
					<div id="top-header" className="ui huge header">Edit profile</div>
					<form className={formClasses}>
						<h4 className="ui dividing header">Personal information</h4>
						<div className="two fields">
							<div className="four wide field">
								<label>Street address</label>
								<input type="text" valueLink={this.linkState('address')} name="address" placeholder="Street address"/>
							</div>
							<div className="four wide field">
								<label>City</label>
								<input type="text" valueLink={this.linkState('city')} name="city" placeholder="City"/>
							</div>
						</div>
						<div className="two fields">
							<div className="four wide field">
								<label>State</label>
								<input type="text" valueLink={this.linkState('state')} name="State" placeholder="State"/>
							</div>
							<div className="four wide field">
								<label>Country</label>
								<input type="text" valueLink={this.linkState('country')} name="country" placeholder="Country"/>
							</div>
						</div>
						<h4 className="ui dividing header">Professional information</h4>
						<div className="two fields">
							<div className="four wide field">
								<label>Degrees</label>
								<input type="text" valueLink={this.linkState('degrees')} name="degrees" placeholder="Degrees (separate by comma)"/>
							</div>
							<div className="eight wide field">
								<label>Specialities</label>
								<div id="specialities" className="ui fluid multiple search selection dropdown">
								  <input type="hidden" name="specialities"/>
								  <div className="default text">Specialties (select multiple)</div>
								  <i className="dropdown icon"></i>
									  <div className="menu" tabIndex="-1">
										{this.state.processedSpecialities}
									</div>  
								 </div>
							</div>
						</div>
						<div className="fields">
							<div className="eight wide field">
								<label>Affiliated hospitals</label>
								<input type="text" valueLink={this.linkState('affiliated_hospitals')} name="affiliated_hospitals" placeholder="Affiliated hospitals (separate by comma)"/>
							</div>
						</div>
						<div id="submit-button" className={submitButtonClasses}>Update</div>
					</form>
				</div>
			</div>
		  )
	}
};

ReactMixin(editPhysicianProfile.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(editPhysicianProfile);
