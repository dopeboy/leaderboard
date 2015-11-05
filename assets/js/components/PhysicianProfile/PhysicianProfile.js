import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import AuthenticatedComponent from '../AuthenticatedComponent/AuthenticatedComponent'
import '!style!css!less!./PhysicianProfile.less';
import cookie from 'react-cookie';
import RouterContainer from '../../services/RouterContainer'
import when from 'when';

export default AuthenticatedComponent(class PhysicianProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_profile_data: null,
		};
	}

	componentDidMount() { 
		this.props.makeAuthRequest(
			"/physicians/" + this.props.params.userID,
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

	getSpecialities() {
		var str = "";
		Object.keys(this.state.user_profile_data.specialities).forEach(function (key) { 
			str += ' ' + this.state.user_profile_data.specialities[key].speciality_name + (key != this.state.user_profile_data.specialities.length-1 ? ", " : "");
		}.bind(this));
		return str;
	}

	// If I'm viewing my own profile, just show edit profile button. Else show all buttons
	getButtonList() { 

		if (this.props.params.userID == this.props.user.user_id) { 
			return (
					<div className="thirteen wide column">
						<Link to="edit-physician-profile" params={{userID: this.props.user.user_id}} className="ui blue button">Edit profile</Link>
					</div>
				   )
		}

		else { 
			return (
					<div className="thirteen wide column">
						<button className="ui blue button">Send message</button>
						<button className="ui pink button">Schedule A/V conference</button>
						<button className="ui green button">Authorize release of medical information</button>
						<button className="ui violet button">Travel to this physician</button>
					</div>
				   )
		}
	}

	render() {
		return (
			<div id="physician-profile-component"> 
				<Helmet title="Provider profile" />
				{this.loader()}
				{ this.state.user_profile_data !== null && 
				<div className="ui main grid container">
					<div id="top-header" className="ui huge header">Provider profile</div>
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
									<div className="item">Degrees: {this.state.user_profile_data.degrees}</div>
									<div className="item">Specialities:{this.getSpecialities()}</div>
									<div className="item">Affiliated hospitals: {this.state.user_profile_data.affiliated_hospitals == null ? "None" : this.state.user_profile_data.affiliated_hospitals  }</div>
									<div className="item">
										Location: {this.state.user_profile_data.user.country == null ? "None" : this.state.user_profile_data.user.city + ', ' + this.state.user_profile_data.user.state + ', ' +  
										this.state.user_profile_data.user.country}  
									</div>
								</div>
							</div>
						</div>
					  </div>
					  <p></p>
					  <p></p>
					  <div className="three column row">
							<div className="wide column">
								<div className="ui center aligned segment">
									<h1 className="ui centered large header">Procedures</h1>
									None
								</div>
							</div>
							<div className="wide column">
								<div className="ui center aligned segment">
									<h1 className="ui centered large header">Patient testimonials</h1>
									None
								</div>
							</div>
							<div className="wide column">
								<div className="ui center aligned segment">
									<h1 className="ui centered large header">Procedure videos</h1>
									None
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
