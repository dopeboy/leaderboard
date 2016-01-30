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
        ga('send', 'pageview', this.props.params.listName);

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

				$.get('/candidates/' + user_id + '/preclaimviewseen', function(result) {
				}.bind(this));
			}
		}.bind(this));

		$(React.findDOMNode(this.refs.methodologyModal)).modal({detachable: false});
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
						claim_button = <a onClick={this.handleClaimClick.bind(this, user_id)} href="#" className="ui blue button large">Claim my profile</a>;

						else
							blurred = "blurred";
					}

					return [
						<tr id={s.user.user_uuid} className={blurred}>
							<td>
								<h1 className="ui center aligned header">{s.rank}</h1>
							</td>
							<td className="single line">
								<h2 className="ui center aligned header">{s.user.first_name + " " + s.user.last_name}</h2>
							</td>
							<td className="center aligned">
								{s.current_company}
							</td>
							<td className="center aligned">
								{s.current_title}
							</td>
							<td className="center aligned">
								{claim_button}
							</td>
						</tr>
					]
				}.bind(this)))
	}

	handleMethodologyClick(e) {
		e.preventDefault();
		$(React.findDOMNode(this.refs.methodologyModal)).modal('show');
	}

	render() { 
		var formClasses = "ui form" + (this.state.candidates == null || this.state.list_data == null ? " loading" : "");

		return (
		<form className={formClasses}>
			<div id='list-component'>
				<Helmet title="Leaderboard" />
				<div className="ui vertical masthead center aligned ">
					<div id="top-header" className="ui text container">
						<h1 className="ui header center aligned ">
							{this.state.list_data == null ? "" : this.state.list_data.title}
						</h1>
						<h2 className="ui header center aligned">
							{this.state.list_data == null ? "" : this.state.list_data.description}
						</h2>
					</div>
					<h4 className="ui header center aligned">
						<a onClick={this.handleMethodologyClick.bind(this)} href="#" ref="methodology-link">Learn more about our ranking methodology</a>
					</h4>
					<div ref="methodologyModal" className="ui modal">
					  <i className="close icon"></i>
					  <div className="header">
						Our methodology
					  </div>
					  <div className="content">
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
					  <div className="actions">
						<div className="ui positive right button">
						  Close
						</div>
					  </div>
					</div>
				</div>
				<div id="list" className="ui container large form">
					<table id="list-table" className="ui large very padded table">
						<thead>
							<tr>
								<th className="two wide center aligned">Rank</th>
								<th className="three wide center aligned">Name</th>
								<th className="four wide center aligned">Employer</th>
								<th className="four wide center aligned">Title</th>
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
		</form>
		)
	}
}
