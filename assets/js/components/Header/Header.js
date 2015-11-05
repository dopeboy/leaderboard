import React from 'react';
import '!style!css!less!./Header.less';
import {Routehandler, Link} from 'react-router';
import RouterContainer from '../../services/RouterContainer'

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			routeToUserProfile: this.routeToUserProfile
		};
	}

	componentDidMount() {
		$('.ui.menu .ui.dropdown').dropdown({
			on: 'click'
		});
	}

	// Using <Link> doesn't work in the header. So manually change route
	routeToUserProfile(e) {
		e.preventDefault(); // Or else hash will show
		RouterContainer.get().transitionTo('/' + this.props.user.role + '-profile/' + this.props.user.user_id);
	}

	componentDidUpdate() {
		$('.ui.menu .ui.dropdown').dropdown('refresh');
	}

	loginArea() {
		if (this.props.userLoggedIn == true)
			return (
				<div className="right menu">
						<a href="#" className="ui right floated dropdown item" tabIndex="0">
							{this.props.user.user_firstname} <i className="dropdown icon"></i>
							<div className="menu transition hidden" tabIndex="-1">
								<div onClick={this.routeToUserProfile.bind(this)} className="item">Profile</div>
								<div className="divider"></div>
								<div onClick={this.props.logout} className="item">Sign out</div>
							</div>
						</a>
				</div>
			)
		else {
			return (
				<div className="right menu">
					<div className="item">
						<Link to="login" className="ui button">Log in</Link>
					</div>
					<div className="item">
						<Link to="signup" className="ui primary button">Sign Up</Link>
					</div>
				</div>
			)
		}
	}

	render() { 
		return (
			<div id="header-component">
				<div className="ui menu">
					<div className="ui container">
						<a href="#" className="">
							<Link to={this.props.userLoggedIn == true ? 'dashboard' : 'home'}>
								<div href="#" className="header item">
									<img className="logo" src={require('../../../images/logo.png')}/>
									mundaii
								</div>
							</Link>
						</a>
						<Link to="features" className="item" style={{display: this.props.userLoggedIn == false? "" : "none"}}>Features</Link>
						<Link to="pricing" className="item" style={{display: this.props.userLoggedIn == false? "" : "none"}}>Pricing</Link>
						<Link to="dashboard" className="item" style={{display: this.props.userLoggedIn == true? "" : "none"}}>Dashboard</Link>
						{this.loginArea()}
					</div>
				</div>
			</div>
		)
	} }
