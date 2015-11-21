import '!style!css!less!./Claim.less';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import ReactMixin from 'react-mixin';
import React from 'react/addons';
import cookie from 'react-cookie';

export default class Claim extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			candidate: null
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
	}

	handleValidForm(e) {
		e.preventDefault();
		$.ajax({
			url: "/candidates/" + this.props.params.user_id + "/password", 
			data: {"password": this.state.password},
			type: "POST",
			headers: {'X-CSRFToken': cookie.load('csrftoken')},
			success: function(data) {
				$('.ui.form#password')
					.transition({
						animation : 'fade right',
						duration  : 500,
						onComplete : function() {
						}
					});
			}
		});
	}

	render() { 
		var formClasses = "ui large form" + (this.state.candidate == null ? " loading" : "");
		var first_name = this.state.candidate == null ? "" : this.state.candidate.user.first_name;

		return (
			<div id="claim-component">
				<div id="nakedheader-component" className="ui middle aligned center aligned grid">
					<div className="column">
					<h1>Leaderboard</h1>
					</div>
				</div>
				<div className="ui middle aligned center aligned grid">
					<div className="column">
						<form id="password" className={formClasses}>
							<div className="ui stacked segment" >
								<div className="ui huge header" >
									<div className="content">{first_name}, claim your profile</div>
								</div>
								<div className="field">
									<div className="ui big left icon input" >
										<i className="lock icon"></i>
										<input type="password" valueLink={this.linkState('password')} name="password" placeholder="Password"/>
									</div>
								</div>
								<div className="ui fluid big green submit button">Claim</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

ReactMixin(Claim.prototype, React.addons.LinkedStateMixin);
