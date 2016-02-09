import '!style!css!less!./Footer.less';
import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import RouterContainer from '../../services/RouterContainer'

export default class Footer extends React.Component {
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
              <div id="footer-component" className="ui inverted menu">
                  <div className="ui inverted vertical footer segment">
                    <div className="ui container">
                      <div className="ui stackable inverted grid">
                        <div className="five wide column">
                        </div>
                        <div className="three wide column">
                          <h4 className="ui inverted header">Company</h4>
                          <div className="ui inverted link list">
                            <a href="#" className="item">About us</a>
                            <a href="#" className="item">Team</a>
                            <a href="#" className="item">Media guide</a>
                          </div>
                        </div>
                        <div className="three wide column">
                          <h4 className="ui inverted header">Resources</h4>
                          <div className="ui inverted link list">
                            <a href="#" className="item">FAQ</a>
                            <a href="#" className="item">Contact us</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
		)
	}
}
