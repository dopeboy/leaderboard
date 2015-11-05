import React from 'react';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import '!style!css!less!./Footer.less';

export default class Footer extends React.Component {
	render() { 
		return (
			<div id="footer-component">
				<div className="ui inverted vertical footer segment">
					<div className="ui container">
						<div className="ui stackable inverted divided equal height stackable grid">
							<div className="two wide column">
								<h4 className="ui inverted header">Company</h4>
								<div className="ui inverted link list">
									<Link activeClassName="" to="about" className="item">About</Link>
									<a href="mailto: contact@mundaii.com" className="item">Contact Us</a>
								</div>
							</div>
							<div className="two wide column">
								<h4 className="ui inverted header">Resources</h4>
								<div className="ui inverted link list">
									<Link activeClassName="" to="privacy-policy" className="item">Privacy policy</Link>
									<Link activeClassName="" className="item" to="terms-of-service">Terms of service</Link>
								</div>
							</div>
							<div className="two wide column">
								<h4 className="ui inverted header">We're social</h4>
								<div className="ui inverted link list">
									<Link activeClassName="" to="home" className="item">Twitter</Link>
									<Link activeClassName="" className="item" to="home">Facebook</Link>
									<Link activeClassName="" className="item" to="home">Instagram</Link>
								</div>
							</div>
							<div className="six wide column">
								<h4 className="ui inverted header">We believe you deserve more choices for healthcare.</h4>
								Click <Link to="signup">here</Link> to start getting them.
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
