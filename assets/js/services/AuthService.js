import request from 'reqwest';
import reqwest from 'reqwest'
import when from 'when';
import {JWT_REFRESH_URL, LOGIN_URL, PATIENT_SIGNUP_URL, PHYSICIAN_SIGNUP_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';
import cookie from 'react-cookie';

class AuthService {

	login(email, password) {
		return this.handleAuth(when(request({
			url: LOGIN_URL,
			method: 'POST',
			crossOrigin: true,
			headers: {'X-CSRFToken': cookie.load('csrftoken')},
			type: 'json',
			data: {
				email, password
			}
		})));
	}

	logout(path='/') {
		LoginActions.logoutUser(path);
	}

	signup(data) {
		return this.handleAuth(when(request({
			url: data.role == 0 ? PATIENT_SIGNUP_URL : PHYSICIAN_SIGNUP_URL,
			method: 'POST',
			crossOrigin: true,
			contentType: 'application/json',
			headers: {'X-CSRFToken': cookie.load('csrftoken')},
			type: 'json',
			data: JSON.stringify(data)
		})));
	}

	handleAuth(loginPromise) {
		return loginPromise
			.then(function(response) {
				var jwt = response.token;
				LoginActions.loginUser(jwt);
				return true;
			});
	}

				
	// Now, make the actual request
	runRequest(refreshPromise, path, method, data) {
		return refreshPromise
			.then(function(response) {
				var jwt = response.token;
				LoginActions.updateToken(jwt);
				return jwt;
			}).catch(function(response) {return response;} ).then(
				function(jwt) { 
					return reqwest({
						url: path,
						method: method,
						crossOrigin: true,
						contentType: 'application/json',
						headers: {'Authorization' : 'JWT ' + jwt},
						type: 'json',
						data: JSON.stringify(data)}).then(function(response) { return response;} )
				});
	}
				
	// First, refresh the JWT
	makeAuthRequest(currentJWT, path, method, data) {
		return this.runRequest(when(request({
			url: JWT_REFRESH_URL,
			method: 'POST',
			crossOrigin: true,
			contentType: 'application/json',
			type: 'json',
			data: '{"token":"' + currentJWT + '"}' 
		})), path, method, data);
	}
}

export default new AuthService()
