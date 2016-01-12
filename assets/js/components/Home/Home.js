import '!style!css!less!./Home.less';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import React from 'react/addons';
import cookie from 'react-cookie';
import ContentEditable from "react-contenteditable";
import RouterContainer from '../../services/RouterContainer'


export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
	}
	render() { 
        return (
            <div>Leaderboard</div>
        )
	}
}
