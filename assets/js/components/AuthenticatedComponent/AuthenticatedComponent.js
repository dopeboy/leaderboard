import React from 'react';
import LoginStore from '../../stores/LoginStore';
import Auth from '../../services/AuthService.js';
import ReactMixin from 'react-mixin';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

	makeAuthRequest(path, method, data) {
		return Auth.makeAuthRequest(this.state.jwt, path, method, data)
		.catch(function(error) {
			var errorMsg = JSON.parse(error.response)

			if (errorMsg.hasOwnProperty('error') || 
				errorMsg.hasOwnProperty('detail')) {
				// If the token is too old to renew,
				// run the logout action (which in turn
				// will dispatch the logout signal)
				// TODO: get current path and set nextPath
				// so that after login user goes back
				// to where they were
				if (errorMsg[0] === "Signature has expired." ||
					errorMsg[0] === "Refresh has expired." ||
					errorMsg.detail === "Invalid Authorization header. Credentials string should not contain spaces.") {
					Auth.logout('/login');
				}
			}

			else {
				alert('Error');
				console.log(errorMsg);
				return error;
			}
		});
	}

	showLoader() {
		$("body").css("overflow-y", "hidden");
		return (
				<div className="ui active inverted dimmer">
					<div className="ui loader"></div>
				</div>
			   )
	}

	hideLoader() {
		$("body").css("overflow-y", "scroll");
	}

    render() {
      return (
      <ComposedComponent
        {...this.props}
		jwt={this.state.jwt}
        user={this.state.user}
        userLoggedIn={this.state.userLoggedIn}
		showLoader={this.showLoader}
		makeAuthRequest={this.makeAuthRequest.bind(this)}
		hideLoader={this.hideLoader} />
      );
    }
  }
};

