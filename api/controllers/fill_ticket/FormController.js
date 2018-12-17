/**
 * FormController
 *
 * @description :: Creating a ticket.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  data: {
    formData: {},
    formErrors: {},
    formRules: {
      input1: 'required'
    },
    cloudError: ''
  },
  newTicket : async function(req, res)
  {
    console.log(req.allParams());

    var addTicketQuery = "INSERT into ticket VALUES (default, default, default,\'" + req.param('email') +"\',\'"+ req.param('address')+"\',\'"+
    req.param('direction')+"\', null, \'non\', default)";
    console.log(addTicketQuery);
    var executeAddTicket = await sails.sendNativeQuery(addTicketQuery);
    return res.view('pages/fill_ticket/new', {dataF : req.param('email')});
  }

};

