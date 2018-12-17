/**
 * AnswerTicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  	list:function (req, res) {
  		Ticket.find({}).exec(function (err, tickets) {
  			if (err)
  				res.send(500, "Internal problem error : the database search failed" );
  			res.view("tickets/list", {tickets:tickets});
  		});
  		
  	}
};

