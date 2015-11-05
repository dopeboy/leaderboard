import React from 'react/addons';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import '!style!css!less!./SignUp.less';
import NakedHeader from '../NakedHeader/NakedHeader.js';
import RouterContainer from '../../services/RouterContainer'

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// If the user is already logged in, pass them straight to the
		// dashboard
		if (this.props.userLoggedIn == true)
			RouterContainer.get().transitionTo('/dashboard');
	}

	render() { 
		return (
		<div id="signup-component"> 
			<NakedHeader />
			<div className="ui two column centered grid">
				<h1 className="ui header">Who are you?</h1>
				<div className="four column centered row">
					<div className="column center aligned">
						<Link to="patient-signup" className="ui blue massive button fluid">I'm a patient</Link>
					</div>
					<div className="column center aligned">
						<Link to="physician-signup" className="ui purple massive button fluid">I'm a physician</Link>
					</div>
				</div>
				<div className="four column centered row">
					<div className="column center aligned">Already a member? <Link to="login">Log in</Link></div>
				</div>
			</div>
		</div>
		)
	}
}
