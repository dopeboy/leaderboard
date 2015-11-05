import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';
import AuthenticatedComponent from '../AuthenticatedComponent/AuthenticatedComponent'
import {Marker, GoogleMap} from 'react-google-maps';
import '!style!css!less!./Dashboard.less';
import {default as update} from "react-addons-update";


export default AuthenticatedComponent(class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: []
		};
	}

	componentDidMount() { 
		this.props.makeAuthRequest(
				(this.props.user.role == "patient" ? "/physicians" : "/patients") + "/dashboard",
				"GET",
				null
				).then(function(response) {
			console.log(response);
			response.map((physician, index) => {
				var {markers} = this.state;
				console.log(physician);
				markers.push(
					{
						position: {
							lat: parseFloat(physician.user.latitude),
							lng: parseFloat(physician.user.longitude)
						},
						key: Date.now(),
						defaultAnimation: 0
					}
				);
				this.setState({ markers });
			});
		}.bind(this));
	}

	render() {
		return (
				<div id="map-container">
					  <GoogleMap containerProps={{
						  ...this.props,
						  style: {
							height: "100%",
							width: "100%"
						  },
						}}
						ref="map"
						defaultZoom={2}
						defaultCenter={{lat: -25.363882, lng: 0.044922}}
						>
						})}

        {this.state.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
               />
          );
        })}
					  </GoogleMap>
			  </div>
		)
	}
});
