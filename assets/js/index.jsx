import React from 'react';
import Router from 'react-router';

import {DefaultRoute, Route, RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import RouterContainer from './services/RouterContainer.js'
import LoginActions from './actions/LoginActions.js'
import LoginStore from './stores/LoginStore.js'
import AuthService from './services/AuthService'
import '!style!css!less!./index.less';

import List from './components/List/List';
import Claim from './components/Claim/Claim'

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
	  <Route handler={FullSizeContainer}>
		  <DefaultRoute handler={List} name="list"/>
		  <Route name="claim" path="claim/:user_id" handler={Claim}>
		  </Route>
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

router.run(function (Handler) {
	React.render(<Handler data={$('script#app-data').text()}/>, document.getElementById('react-app'));
});
