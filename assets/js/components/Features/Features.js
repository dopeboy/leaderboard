import React from 'react';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Features extends React.Component {
	render() { 
		return (
			<div className="ui main text container">
				<Helmet title="Features" />
				<div className="ui huge header">Features</div>
				<div className="ui medium header">For patients</div>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/VS_fkqvxv58" frameborder="0" allowfullscreen></iframe>
				<div id="medical-providers" className="ui medium header">For medical providers</div>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/cRt9nlSotqY" frameborder="0" allowfullscreen></iframe>
			</div>
			   )
	}
}
