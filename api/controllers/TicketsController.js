/**
 * AnswerTicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {

 	list_waiting:function (req, res) {
 		Ticket.find({status: 'Waiting'}).exec(function (err, tickets) {
 			if (err)
 				res.send(500, "Internal problem error : the database search failed" );
 			res.view("tickets/list_waiting", {tickets:tickets});
 		});

 	},
 	list_accepted:function (req, res) {
 		Ticket.find({status: 'Accepted'}).exec(function (err, tickets) {
 			if (err)
 				res.send(500, "Internal problem error : the database search failed" );
 			res.view("tickets/list_accepted", {tickets:tickets});
 		});

 	},
 	list_denied:function (req, res) {
 		Ticket.find({status: 'Denied'}).exec(function (err, tickets) {
 			if (err)
 				res.send(500, "Internal problem error : the database search failed" );
 			res.view("tickets/list_denied", {tickets:tickets});
 		});

 	},
 	answer: function(req, res) {
 		Ticket.findOne({id: req.params.id}).exec(function (err, ticket) {
 			if (err)
 				res.send(500, "Internal problem error : the database search failed" );
 			res.view("tickets/answer/", {ticket:ticket});
 		});
 		return false;
 	},
 	accept: function(req, res) {
 		sails.log(req.body);
 		Ticket.update({id: req.params.id}, {admin_comment:req.body.admin_comment, status: "Accepted", meeting_date: req.body.date, meeting_time_start: req.body.time_start, meeting_time_end : req.body.time_end}).exec(function (err) {
 			if (err)
 				res.send(500, "Internal problem error : the ticket has not been responding" );
 			const fs = require('fs');
 			const readline = require('readline');
	 		const {google} = require('googleapis');

			// If modifying these scopes, delete token.json.
			const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
			// The file token.json stores the user's access and refresh tokens, and is
			// created automatically when the authorization flow completes for the first
			// time.
			const TOKEN_PATH = 'token.json';

			// Load client secrets from a local file.
			fs.readFile('credentials.json', (err, content) => {
				if (err) return sails.log('Error loading client secret file:', err);
			  // Authorize a client with credentials, then call the Google Calendar API.
			  authorize(JSON.parse(content), createEvent);
			});

			/**
			 * Create an OAuth2 client with the given credentials, and then execute the
			 * given callback function.
			 * @param {Object} credentials The authorization client credentials.
			 * @param {function} callback The callback to call with the authorized client.
			 */
			 function authorize(credentials, callback) {
			 	const {client_secret, client_id, redirect_uris} = credentials.installed;
			 	const oAuth2Client = new google.auth.OAuth2(
			 		client_id, client_secret, redirect_uris[0]);

			  // Check if we have previously stored a token.
			  fs.readFile(TOKEN_PATH, (err, token) => {
			  	if (err) return getAccessToken(oAuth2Client, callback);
			  	oAuth2Client.setCredentials(JSON.parse(token));
			  	callback(oAuth2Client);
			  });
			}

			/**
			 * Get and store new token after prompting for user authorization, and then
			 * execute the given callback with the authorized OAuth2 client.
			 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
			 * @param {getEventsCallback} callback The callback for the authorized client.
			 */
			 function getAccessToken(oAuth2Client, callback) {
			 	const authUrl = oAuth2Client.generateAuthUrl({
			 		access_type: 'offline',
			 		scope: SCOPES,
			 	});
			 	sails.log('Authorize this app by visiting this url:', authUrl);
			 	const rl = readline.createInterface({
			 		input: process.stdin,
			 		output: process.stdout,
			 	});
			 	rl.question('Enter the code from that page here: ', (code) => {
			 		rl.close();
			 		oAuth2Client.getToken(code, (err, token) => {
			 			if (err) return sails.error('Error retrieving access token', err);
			 			oAuth2Client.setCredentials(token);
			      // Store the token to disk for later program executions
			      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			      	if (err) sails.error(err);
			      	sails.log('Token stored to', TOKEN_PATH);
			      });
			      callback(oAuth2Client);
			  });
			 	});
			 }
			function  createEvent(auth) {
				var event = {
					'summary': 'Bob graffiti',
					'location': req.body.address,
					'description': req.body.mail,
					'attendees': [
					{'email': req.body.mail}
					],
					'start': {
						'dateTime': req.body.date + 'T'+req.body.time_start+':00+01:00',
						'timeZone': 'Europe/Paris',
					},
					'end': {
						'dateTime': req.body.date + 'T'+req.body.time_end+':00+01:00',
						'timeZone': 'Europe/Paris',
					}
				}
				const calendar = google.calendar({version: 'v3', auth});
				calendar.events.insert({
					auth: auth,
					calendarId: 'primary',
					resource: event,
				}, function(err, event) {
					if (err) {
						sails.log('There was an error contacting the Calendar service: ' + err);
						return;
					}
					sails.log('Event created: %s', event.htmlLink);
					res.redirect("/tickets/list_waiting");
				});

			};


 		});
 		return false;
 	},
 	deny: function(req, res) {
 		Ticket.update({id: req.params.id}, {admin_comment:req.body.admin_comment, status: "Denied"}).exec(function (err) {
 			if (err)
 				res.send(500, "Internal problem error : the ticket has not been responding" );

	 			res.redirect("/tickets/list_waiting");
			 		});
			 		return false;
 	},
 	calendar: function(req, res) {



/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 // function listEvents(auth) {
 // 	const calendar = google.calendar({version: 'v3', auth});
 // 	calendar.events.list({
 // 		calendarId: 'primary',
 // 		timeMin: (new Date()).toISOString(),
 // 		maxResults: 10,
 // 		singleEvents: true,
 // 		orderBy: 'startTime',
 // 	}, (err, res) => {
 // 		if (err) return console.log('The API returned an error: ' + err);
 // 		const events = res.data.items;
 // 		if (events.length) {
 // 			console.log('Upcoming 10 events:');
 // 			events.map((event, i) => {
 // 				const start = event.start.dateTime || event.start.date;
 // 				console.log(`${start} - ${event.summary}`);
 // 			});
 // 		} else {
 // 			console.log('No upcoming events found.');
 // 		}
 // 	});
 // }

 // Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.


}

};

