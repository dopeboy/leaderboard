import '!style!css!less!./List.less';
import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';

export default class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			candidates: null
		}
	}

	componentDidMount() {
		$.get('/candidates', function(result) {
			this.setState({
				candidates: this.processCandidates(result)
			});
		}.bind(this));
	}

	processCandidates(candidates_data) {
		return (
				candidates_data.map(function(s, i) {
					return [
						<tr>
							<td>
								<h2 className="ui center aligned header">{s.rank}</h2>
							</td>
							<td className="single line">
								{s.user.first_name + " " + s.user.last_name}
							</td>
							<td>
								{s.current_company}
							</td>
							<td className="">
								{s.current_title}
							</td>
						</tr>
					]
				}))
	}

	render() { 
		var formClasses = "ui text container large form" + (this.state.candidates == null ? " loading" : "");

		return (
		<div id='list-component'>
			<Helmet title="Leaderboard" />
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui text container">
					<h1 className="ui inverted header">
						Topshelf
					</h1>
					<h2>The top 25 email marketers in New York City.</h2>
				</div>
			</div>
			<div id="list" className={formClasses}>
				<table className="ui large celled padded table">
					<thead>
						<tr><th className="single line center aligned">Rank</th>
							<th className="center aligned">Name</th>
							<th className="center aligned" >Current Company</th>
							<th className="center aligned" >Current Job Title</th>
						</tr></thead>
						<tbody>
						{this.state.candidates}
						</tbody>
				</table>
			</div>
		</div>
		)
	}
}
