import '!style!css!less!./Claim.less';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import React from 'react/addons';
import cookie from 'react-cookie';
import ContentEditable from "react-contenteditable";
import RouterContainer from '../../services/RouterContainer'


export default class Claim extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			candidate: null,
			html: '<ul ref="aaa" tabIndex="1" contentEditable="true"><li></li></ul>',
			accomplishments: [],
			status: null
		}
	}

	componentDidMount() {
		$('.ui.form#password').form({
			fields: {
				password: {
					identifier  : 'password',
					rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your password'
					},
					{
						type   : 'length[6]',
						prompt : 'Your password must be at least 6 characters'
					}
					]
				}
			},
			inline: true,
			onSuccess: this.handleValidForm.bind(this)
		});

        ga('send', 'pageview', this.props.params.user_id);

		$.get('/candidates/' + this.props.params.user_id + '/passwordviewseen', function(result) {
			this.setState({
				candidate: result
			});
		}.bind(this));

		$.get('/candidates/' + this.props.params.user_id, function(result) {
			this.setState({
				candidate: result
			});
		}.bind(this));

		var secretLookingRadio = $(React.findDOMNode(this.refs.secretLookingRadio));
		secretLookingRadio.checkbox('enable');
		secretLookingRadio.checkbox('setting', 'onChange', this.handleSecretlyLooking.bind(this));

		var justLookingRadio = $(React.findDOMNode(this.refs.justLookingRadio));
		justLookingRadio.checkbox('enable');
		justLookingRadio.checkbox('setting', 'onChecked', this.handleJustLooking.bind(this));

		var notInterestedRadio = $(React.findDOMNode(this.refs.notInterestedRadio));
		notInterestedRadio.checkbox('enable');
		notInterestedRadio.checkbox('setting', 'onChecked', this.handleNotInterested.bind(this));
	}

	handleSecretlyLooking() {
		$("#next-opportunity").show();
		this.setState({status: 'SL'});
	}

	handleJustLooking() {
		$("#next-opportunity").show();
		this.setState({status: 'JL'});
	}

	handleNotInterested() {
		$("#next-opportunity").hide();
		this.setState({status: 'NI'});
	}

	submitAccomplishments() {
		var accomplishmentsButton = $(React.findDOMNode(this.refs.accomplishmentsButton));
		accomplishmentsButton.addClass("loading");

		$.ajax({
			url: "/candidates/" + this.props.params.user_id + "/accomplishments", 
			data: {"accomplishments": JSON.stringify(this.state.accomplishments), "status": this.state.status},
			type: "POST",
			headers: {'X-CSRFToken': cookie.load('csrftoken')},
			success: function(data) {
			RouterContainer.get().transitionTo('/');
			}.bind(this)
		});
	}

	handleValidForm(e) {
		e.preventDefault();

		var claimButton = $(React.findDOMNode(this.refs.claimButton));
		claimButton.addClass("loading");

		$.ajax({
			url: "/candidates/" + this.props.params.user_id + "/password", 
			data: {"password": this.state.password},
			type: "POST",
			headers: {'X-CSRFToken': cookie.load('csrftoken')},
			success: function(data) {
				var claimDiv = $(React.findDOMNode(this.refs.claimDiv));
				claimDiv
					.transition({
						animation : 'fade right',
						duration  : 500,
						onComplete : function() {
							var accomplishmentsDiv = $(React.findDOMNode(this.refs.accomplishmentsDiv));
							accomplishmentsDiv
								.transition({
									animation : 'fade left',
									duration  : 500,
									onComplete : function() {
									}
							});
						}.bind(this)
					});
			}.bind(this)
		});
	}

	handleKeyDown(event) { 
        console.log(event.keyCode);
		if (event.nativeEvent.keyCode == 8 || event.nativeEvent.keyCode == 13) {
			if ($(event.target).find('li').first()[0].innerHTML === "<br>")
				event.preventDefault();

			if (event.nativeEvent.keyCode == 13) {
				if ($(event.target).find('li').last()[0].innerHTML === "<br>")
					event.preventDefault();
			}
		}

	}

	handleChange(event) {
		var accomplishments = [];
		for (var i=0; i<$(event.target).find('li').length; ++i) {
			var element = $(event.target).find('li')[i];
			if (element.innerText !== "\n")
				accomplishments.push(element.innerText);
		}

		this.setState({accomplishments: accomplishments})
	}


	render() { 
		var formClasses = "ui large form" + (this.state.candidate == null ? " loading" : "");
		var first_name = this.state.candidate == null ? "" : this.state.candidate.user.first_name;
		var textareaStyle = {
			outline: 0
		};

		return (
		<div>
			<div ref="claimDiv" id="claim-component">
				<div className="ui center aligned grid">
					<div className="column">
						<form id="password" className={formClasses}>
							<div className="ui stacked segment" >
								<div className="ui huge header" >
									<div id="claim-your" className="content">{first_name}, Claim your LeaderRank Profile!</div>
								</div>
								<div className="ui divider"></div>
								<div className="ui left aligned tiny header" >
									<div id="" className="content">Our goal is to promote top-performing professionals, like you, at the top of their game. Claim your profile to:</div>
									<ul>
										<li>Improve your rank by adding more information to your profile</li>
										<li>Generate awareness of your rank with top companies</li>
										<li>Get help from us during your next salary negotiation</li>
									</ul>
								</div>
								<div className="field">
									<div className="ui big left icon input" >
										<i className="lock icon"></i>
										<input type="password" valueLink={this.linkState('password')} name="password" placeholder="Password"/>
									</div>
								</div>
								<div className="ui fluid big green submit button" ref="claimButton">Claim</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div ref="accomplishmentsDiv" className="hidden transition" id="accomplishments-component">
				<div className="ui grid">
					<div id="finish-profile" className="column">
						<div className="ui stacked segment" >
							<div className="ui center aligned huge header" >
								<div className="content">Finish your profile</div>
							</div>
							<div className="ui divider"></div>
							<div className="ui aligned form">
								Are you interested in exploring job opportunities?
								<br/>
								<br/>
								<div className="field">
									<div ref="justLookingRadio" className="ui radio checkbox">
										<input type="radio" name="frequency" checked={this.state.status == "JL" ? "checked" : ""}/>
										<label>Yes, looking to switch jobs soon</label>
									</div>
								</div>
								<div className="field">
									<div ref="secretLookingRadio" className="ui radio checkbox">
										<input type="radio" name="frequency" checked={this.state.status == "SL" ? "checked" : ""}/>
										<label>Maybe, if the right one came along</label>
									</div>
								</div>
								<div className="field">
									<div ref="notInterestedRadio" className="ui radio checkbox">
										<input type="radio" name="frequency" checked={this.state.status == "NI" ? "checked" : ""}/>
										<label>Not at all</label>
									</div>
								</div>
								<div id="next-opportunity" ref="next-opportunity">
									<br/>
									What are the most important things you're looking for in your next opportunity?
									<br/>
									<br/>
									<div className="field">
										<textarea rows="2"></textarea>
									</div>
								</div>
							</div>
							<br/>
							<div className="ui fluid big green submit button" onClick={this.submitAccomplishments.bind(this)} ref="accomplishmentsButton">Update</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

ReactMixin(Claim.prototype, React.addons.LinkedStateMixin);
