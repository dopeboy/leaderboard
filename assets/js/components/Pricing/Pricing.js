import React from 'react';
import {Routehandler, Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Pricing extends React.Component {
	componentDidMount() { 
		$('.ui.accordion').accordion();
	}

	render() { 
		return (
		<div className="ui main text container">
			<Helmet title="Pricing" />
			<div className="ui huge header">Pricing</div>
			<div className="ui medium header">Patients / General customers</div>

			<div className="ui styled accordion">
				<div className="title">
					<i className="dropdown icon"></i>
					mundaii account*: Free
				</div>
				<div className="content">

					<ul className="ui list">
						<li>Create your account, update your profile.</li>
						<li>Upload your profile photo.</li>
						<li>Create and store your electronic medical record.</li>
						<li>Access your electronic medical records stored on a secure cloud from any part of the world through your account.</li>
						<li>Look and search for as many number of physicians worldwide as you want. </li>
						<li>Send messages to and receive messages from any number of physicians / dentists / providers worldwide as many times as you want.</li>
						<li>Send / release your medical records to any physicians you want. </li>
						<li>Obtain audio-video consultations or text message opinions. Prices of any form of consultations are determined by a mutual agreement between the physician (doctor/provider) and patient (yourself). Physician (provider) may provide consultation absolutely free or at a price that is acceptable to you with your prior permission.</li>
					</ul>

				</div>
				<div className="title">
					<i className="dropdown icon"></i>
					mundaii plus**: $9.99/month
				</div>
				<div className="content">
					<ul className="ui list">
						<li>Store your digital images like your CT Scans, MRIs, and X-rays etc. on the cloud.</li>
						<li>Have a 24X7 access to your images and medical records through your account from anywhere in the world. </li>
						<li>Release any or all images to any physician (Doctor / Dentist or any other medical provider) online to seek their opinion at your will.</li>
					</ul>

				</div>
			</div>

			<div className="ui medium header">Physicians (Doctors / Dentists / Other providers)</div>
			<div className="ui styled accordion">
				<div className="title">
					<i className="dropdown icon"></i>
					mundaii account*: Free
				</div>
				<div className="content">

					<ul className="ui list">
						<li>Create your profile.</li>
						<li>Enter your credentials, degrees etc.</li>
						<li>Enter your practice information.</li>
						<li>Upload your professional photographs.</li>
						<li>Make your profile information visible to patients worldwide.</li>
						<li>Access your cloud based account from anywhere in the world.</li>
					</ul>

				</div>
				<div className="title">
					<i className="dropdown icon"></i>
					mundaii plus**: $9.99/month
				</div>
				<div className="content">
					<ul className="ui list">
						<li>Upload any procedure videos explaining your expertise.</li>
						<li>Upload practice videos or hospital videos.</li>
						<li>Upload patient testimonials that can bolster confidence of patients in seeking care from you.</li>
						<li>See messages sent to you by patients and respond to them through mundaii.</li>
						<li>Offer consultations online using mundaii’s audio-visual tools.</li>
						<li>Engage with as many patients as you want worldwide and provide medical opinion to them at a price acceptable to you and the patient.</li>
					</ul>
				</div>

				<div className="title">
					<i className="dropdown icon"></i>
					5% of any consultation fees charged to patients on mundaii platform
				</div>
				<div className="content">
					Mundaii does not decide if you should charge patients for consultation. mundaii charges you 5% of the consultation fee that you charge the patient for providing your opinion through mundaii. This covers the financial transaction charges that mundaii incurs while transferring payments from patients to physicians / providers with an additional small margin.
					Of course, you are free to provide consultations at no charge to patients, in order to promote your practice. In cases, where you provide consultation services free to patients, mundaii will not be receiving any payment from either you or the patient. The amount you charge a patient for consultation is entirely up to you and your patient to mutually agree upon. 
				</div>
			</div>
			<br/>
			<div className="ui divider"></div>
			<div className="ui list">
				<div className="item">* Includes up to 5 GB of digital storage.</div>
				<div className="item">** Includes up to 100 GB of digital storage.</div>
			</div>
		</div>
			   )
	}
}
