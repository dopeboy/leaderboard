import '!style!css!less!./Home.less';
import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Home extends React.Component {
	render() { 
		return (
			<div id='home-component'>
				<Helmet title="Home" />
				<div className="ui vertical masthead center aligned segment">
					<div className="ui text container" >
						<h1 className="ui header inverted"><b>The Worldwide Healthcare Marketplace</b></h1>
						<h2 className="ui header inverted">Free. Reliable. Secure.</h2>
						<Link to="signup" className="ui huge primary button">Get Started <i className="right arrow icon"></i></Link>
					</div>
				</div>

				<div className="ui vertical stripe segment">
					<div className="ui middle aligned stackable grid container">
						<div className="row">
							<div className="eight wide column">
								<h3 className="ui header">Free access to healthcare worldwide</h3>
								<p>Through mundaii connect with any doctor, dentist or other medical provider of your choice worldwide. Totally free!</p>
								<h3 className="ui header">Get expert opinion from the doctors worldwide, at a price that's acceptable to you.</h3>
								<p></p>
								<h3 className="ui header">Store your medical records, CT scans, MRIs etc securely. You control who sees it</h3>
								<p></p>
							</div>
							<div className="six wide right floated column">
								<img src={require('../../../images/doctor.png')} className=""/>
								<h3>For medical providers too. Click <Link to="features-medical-providers">here</Link> for more.</h3>
							</div>
						</div>
					</div>
				</div>

				<div className="ui vertical stripe quote segment">
					<div className="ui equal width stackable internally celled grid">
						<div className="center aligned row">
							<div className="column">
								<h3>"Amazing care at a great price."</h3>
								<p>
									<img src={require('../../../images/mark.png')} className="ui avatar image"/>
									<i>John Doe, Brooklyn, NY</i>
								</p>
							</div>
							<div className="column">
								<h3>"Couldn't ask for more."</h3>
								<p>
									<img src={require('../../../images/lena.png')} className="ui avatar image"/>
									<i>Sally Jane, Lexington, KY</i>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
