import '!style!css!less!./List.less';
import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import RouterContainer from '../../services/RouterContainer'

export default class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			candidates: null,
			list_data: null
		}
	}

	componentDidMount() {
		$.get('/lists/search?location=' + this.props.params.location + "&list_name=" + this.props.params.list_name, function(result) {
			this.setState({
				list_data: result
			});
		}.bind(this));

		var user_id = RouterContainer.get().getCurrentQuery().user_id 
		
		$.get('/candidates?location=' + this.props.params.location + "&list_name=" + this.props.params.list_name, function(result) {
			this.setState({
				candidates: this.processCandidates(result, user_id),
			});

			// Smooth scroll down
			if (user_id != null) {
				$('html, body').animate({
					scrollTop: $("#" + user_id).offset().top
				}, 2000);
			}
		}.bind(this));

	}

	componentDidUpdate() {
	}

	handleClaimClick(user_id, e) {
		e.preventDefault();
		RouterContainer.get().transitionTo('/claim/' + user_id);
	}


	// If the user_id is not null, show the button and 
	// deemphasize everything else
	processCandidates(candidates_data, user_id) {
		return (
				candidates_data.map(function(s, i) {
					var claim_button = null;
					var blurred = "";

					if (user_id != null) {
						if (s.user.user_uuid == user_id)
						claim_button = <a onClick={this.handleClaimClick.bind(this, user_id)} href="#" className="ui blue button large">Claim</a>;

						else
							blurred = "blurred";
					}

					return [
						<tr id={s.user.user_uuid} className={blurred}>
							<td>
								<h1 className="ui center aligned header">{s.rank}</h1>
							</td>
							<td className="single line">
								<h2>{s.user.first_name + " " + s.user.last_name}</h2>
							</td>
							<td>
								{s.current_company}
							</td>
							<td className="">
								{s.current_title}
							</td>
							<td className="">
								{claim_button}
							</td>
						</tr>
					]
				}.bind(this)))
	}

	render() { 
		var formClasses = "ui container large form" + (this.state.candidates == null || this.state.list_data == null ? " loading" : "");

		return (
		<div id='list-component'>
			<Helmet title="Leaderboard" />
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui text container">
					<h1 className="ui inverted header">
						Leaderboard: {this.state.list_data == null ? "" : this.state.list_data.title}
					</h1>
					<h2>{this.state.list_data == null ? "" : this.state.list_data.description}</h2>
				</div>
				<div id="selling-points" className="ui relaxed center aligned grid">
					<div className="four wide column">
						<i className="huge checkmark icon"></i>
						<div className="selling-point">
							<h3>Top 3%</h3>
							<h4>We've selected professionals who have succeeded in their jobs at the highest levels of performance.</h4>
						</div>
					</div>
					<div className="four wide column">
						<i className="huge filter icon"></i>
						<div className="selling-point">
							<h3>Multiple data sources</h3>
							<h4>We go beyond the resume and evaluate the full picture. We look at success and quality of execution in each role, and how much the job function contributed to company success.</h4>
						</div>
					</div>
					<div className="four wide column">
						<i className="huge remove circle icon"></i>
						<div className="selling-point">
							<h3>Objective</h3>
							<h4>We use criteria designed for each job role and standardized across list members. We rely heavily on verified third party data.</h4>
						</div>
					</div>
				</div>
			</div>
			<div id="list" className={formClasses}>
				<table className="ui large very basic padded table">
					<thead>
						<tr>
							<th className="two wide center aligned"></th>
							<th className="four wide center aligned"></th>
							<th className="four wide center aligned"></th>
							<th className="three wide center aligned"></th>
							<th className="three wide center aligned"></th>
						</tr>
					</thead>
					<tbody>
						{this.state.candidates}
					</tbody>
				</table>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<div id="send-nom-div" className="ui center aligned grid">
				<div className="eight wide column">
					<div className="ui raised segment">
					  <p>Know someone who deserves to be on this list? <button id="send-nom-btn" className="ui blue small button">Send a nomination</button> </p>
					</div>
				</div>
			</div>
			<div id="methodology-div" className="ui center aligned grid">
				<div className="eight wide column">
					For more about our methodlogy, read here.
				</div>
			</div>
		</div>
		)
	}
}
