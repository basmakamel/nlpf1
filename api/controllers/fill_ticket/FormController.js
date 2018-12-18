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
  init : async function(req, res)
  {
    var client = await req.param("client");
    var clientdb = await Client.find({
      where: {email: client},
      select: ['firstname', 'lastname', 'email']
    });
    console.log("2" + clientdb.length);
    if (clientdb.length == 1) {
      res.view("pages/fill_ticket/form",{email: clientdb[0].email, firstname :clientdb[0].firstname, lastname : clientdb[0].lastname});
      res.end();
    }
    else
      res.redirect("/login");

  },

  newTicket : async function(req, res)
  {
    //console.log('here');
    console.log(req.param('email'));

    var addTicketQuery = "INSERT into ticket VALUES (default, default, default,\'" + req.param('email') +"\',\'"+ req.param('address')+"\',\'"+
    req.param('direction')+"\', null, \'non\', default)";
    //console.log(addTicketQuery);
    var executeAddTicket = await sails.sendNativeQuery(addTicketQuery);
    return res.view('pages/fill_ticket/new', {dataF : req.param('email')});
  }

};

