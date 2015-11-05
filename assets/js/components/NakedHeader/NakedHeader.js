import React from 'react/addons';
import {RouteHandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import './NakedHeader.less';

export default class NakedHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() { 
		return (
			<div id="nakedheader-component" className="ui middle aligned center aligned grid">
				<div className="column">
					<Link to="home">
						<img src={require('../../../images/logo.png')} className="image"/>
					</Link>
				</div>
			</div>
		)
	}
}
