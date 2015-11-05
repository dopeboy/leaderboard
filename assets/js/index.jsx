import React from 'react';
import Router from 'react-router';

import {DefaultRoute, Route, RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import RouterContainer from './services/RouterContainer.js'
import LoginActions from './actions/LoginActions.js'
import LoginStore from './stores/LoginStore.js'
import AuthService from './services/AuthService'
import '!style!css!less!./index.less';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './components/TermsOfService/TermsOfService';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import PatientSignup from './components/PatientSignup/PatientSignup.js';
import PhysicanSignup from './components/PhysicianSignup/PhysicianSignup.js';
import PhysicianProfile from './components/PhysicianProfile/PhysicianProfile.js';
import EditPhysicianProfile from './components/EditPhysicianProfile/EditPhysicianProfile.js';
import PatientProfile from './components/PatientProfile/PatientProfile.js';

export default class App extends React.Component {
	constructor() {
		super()
			this.state = this._getLoginState();
	}

	_getLoginState() {
		return {
			userLoggedIn: LoginStore.isLoggedIn(), 
			user: LoginStore.isLoggedIn() == true ? LoginStore.user : '',
			jwt: LoginStore.isLoggedIn() == true ? LoginStore.jwt : '',
		};
	}

	// This means that when the loginstore emits an event, 
	// it will run the changelistener which is tied to onchange
	// which runs setState thereby updating the component.
	componentDidMount() {
		if (typeof data !== "undefined")
		{
			this.setState({data: data});
		}
		this.changeListener = this._onChange.bind(this);
		LoginStore.addChangeListener(this.changeListener);
	}

	_onChange() {
		this.setState(this._getLoginState());
	}

	componentWillUnmount() {
		LoginStore.removeChangeListener(this.changeListener);
	}

	// When this happens, the auth service calls the store. The store
	// invalides the JWT and emits an event. 
	logout(e) {
		e.preventDefault();
		AuthService.logout();
	}

	render() { 
		return (
			<div>
				<RouteHandler 
				data={this.state.data}
				userLoggedIn={this.state.userLoggedIn} 
				user={this.state.user} 
				logout={this.logout} />
			</div>
		)
	}
}

export default class HeaderContentFooter extends React.Component {
	render() { 
		return (
			<div>
				<Header 
				userLoggedIn={this.props.userLoggedIn} 
				user={this.props.user} 
				logout={this.props.logout} />
					<Helmet
						titleTemplate="mundaii - %s"
						meta={[
							{"name": "description", "content": "Helmet application"},
							{"property": "og:type", "content": "article"}
						]}
					/>
					<RouteHandler/>
				<Footer />
			</div>
		)
	}
}

export default class FullSizeContainer extends React.Component {
	render() { 
		return (
			<div id="full-size-container">
				<RouteHandler/>
			</div>
		)
	}
}

export default class PaddedContainer extends React.Component {
	render() { 
		return (
			<div id="padded-container">
				<RouteHandler/>
			</div>
		)
	}
}

var routes = (
  <Route name="app" path="/" handler={App}>
	  <Route handler={HeaderContentFooter}>
		  <Route handler={FullSizeContainer}>
			  <Route name="dashboard" path="dashboard" handler={Dashboard}>
			  </Route>
			  <DefaultRoute handler={Home} name="home"/>
		  </Route>
		  <Route name="features" path="features" handler={Features}>
		  </Route>
		  <Route name="features-medical-providers" path="features#medical-providers" handler={Features}>
		  </Route>
		  <Route name="pricing" path="pricing" handler={Pricing}>
		  </Route>
		  <Route name="privacy-policy" path="privacy-policy" handler={PrivacyPolicy}>
		  </Route>
		  <Route name="terms-of-service" path="terms-of-service" handler={TermsOfService}>
		  </Route>
		  <Route name="about" path="about" handler={About}>
		  </Route>
		  <Route handler={PaddedContainer}>
			  <Route name="physician-profile" path="physician-profile/:userID" handler={PhysicianProfile}>
			  </Route>
			  <Route name="edit-physician-profile" path="edit-physician-profile/:userID" handler={EditPhysicianProfile}>
			  </Route>
			  <Route name="patient-profile" path="patient-profile/:userID" handler={PatientProfile}>
			  </Route>
		  </Route>
	  </Route>
	  <Route name="login" path="login" handler={Login}>
	  </Route>
	  <Route name="signup" path="signup" handler={SignUp}>
	  </Route>
	  <Route name="physician-signup" path="physicians/signup" handler={PhysicanSignup}>
	  </Route>
	  <Route name="patient-signup" path="patients/signup" handler={PatientSignup}>
	  </Route>
  </Route>
);

var router = Router.create({
	routes: routes,
	location: Router.HistoryLocation,
    scrollBehavior: {
        updateScrollPosition: function updateScrollPosition() {
          var hash = window.location.hash;
          if (hash) {
            var element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView();
            }
          } else {
           window.scrollTo(0, 0);
          }
        }
    }
});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
	LoginActions.loginUser(jwt);
}

router.run(function (Handler) {
	React.render(<Handler data={$('script#app-data').text()}/>, document.getElementById('react-app'));
});
