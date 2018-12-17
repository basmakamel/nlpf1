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
 		Ticket.update({id: req.params.id}, {admin_comment:req.body.admin_comment, status: "Accepted"}).exec(function (err) {
 			if (err)
 				res.send(500, "Internal problem error : the ticket has not been responding" );

 			res.redirect("/tickets/list_waiting");
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
 	}

 };

