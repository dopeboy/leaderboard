import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import AuthenticatedComponent from '../AuthenticatedComponent/AuthenticatedComponent'
import '!style!css!less!./PatientProfile.less';
import cookie from 'react-cookie';
import RouterContainer from '../../services/RouterContainer'
import when from 'when';

export default AuthenticatedComponent(class PatientProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_profile_data: null,
		};
	}

	componentDidMount() { 
		this.props.makeAuthRequest(
			"/patients/" + this.props.params.userID,
			"GET",
			null
		).then(function(response) {
		 		this.setState({
		 		  user_profile_data: response
		 		});
		}.bind(this));
	}

	loader() {
		if (this.state.user_profile_data === null) { 
			return this.props.showLoader();
		}

		else {
			return this.props.hideLoader();
		}
	}

	// If I'm viewing my own profile, just show edit profile button. Else show all buttons
	getButtonList() { 
		if (this.props.params.userID == this.props.user.user_id) { 
			return (
					<div className="thirteen wide column">
						<button className="ui blue button">Edit profile</button>
					</div>
				   )
		}

		else { 
			return (
					<div className="thirteen wide column">
					</div>
				   )
		}
	}

	render() {
		return (
			<div id="patient-profile-component"> 
				<Helmet title="Provider profile" />
				{this.loader()}
				{this.state.user_profile_data !== null && 
				<div className="ui main grid container">
					<div id="top-header" className="ui huge header">Patient profile</div>
					  <div className="row">
						<div className="three wide column">
						</div>
						{this.getButtonList()}
					  </div>
					  <div className="row">
						<div className="three wide column">
							<img className="ui centered circular small image" src={require('../../../images/square-image.png')}/>
						</div>
						<div className="thirteen wide column">
							<div className="ui segment">
								<div className="ui list">
								  <div className="medium header ui item">{this.state.user_profile_data.user.first_name + ' ' + this.state.user_profile_data.user.last_name}</div>
								  <div className="item">Location: None</div>
								</div>
							</div>
						</div>
					  </div>
				</div>
				}
				{ this.state.user_profile_data === null && 
					<div style={{height: 760}}>
						</div>
				}
			</div>
		  )
  }
});
