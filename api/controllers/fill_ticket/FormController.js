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
  newTicket : function(req, res)
  {
    console.log(req.allParams());
    console.log(req.body);
    return res.view('pages/fill_ticket/new', {dataF : req.param('email-address')});
  }

};

