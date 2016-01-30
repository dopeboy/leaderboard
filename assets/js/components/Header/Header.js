import '!style!css!less!./Header.less';
import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import RouterContainer from '../../services/RouterContainer'

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	render() { 
		return (
              <div id="header-component" className="ui inverted menu">
                <div className="ui container">
                  <a id="logo-text" href="#" className="header item">
                    Leaderboard
                  </a>
                </div>
              </div>
		)
	}
}
