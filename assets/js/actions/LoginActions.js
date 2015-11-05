import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
	loginUser: (jwt) => {
		var savedJwt = localStorage.getItem('jwt');
		AppDispatcher.dispatch({
			actionType: LOGIN_USER,
			jwt: jwt
		});

		if (savedJwt !== jwt) {
			var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/dashboard';
			localStorage.setItem('jwt', jwt);
			RouterContainer.get().transitionTo(nextPath);
		}
	},
	updateToken: (jwt) => {
		localStorage.setItem('jwt', jwt);
		AppDispatcher.dispatch({
			actionType: LOGIN_USER,
			jwt: jwt
		});
	},
	logoutUser: (path) => {
		localStorage.removeItem('jwt');
		AppDispatcher.dispatch({
			actionType: LOGOUT_USER
		});
		RouterContainer.get().transitionTo(path);
	}
}
