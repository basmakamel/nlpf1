/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  clients: async function (req, res) {
    var myQuery = "select firstname, lastname, email from client where blacklisted = false";
    console.log("hello");
    var data = await sails.sendNativeQuery(myQuery);
    return res.view('client', {clientslist : data["rows"]});
  },

  deletes: async function (req, res) {
    deletedclient = await req.param("client_email");
    console.log("Deleted client : " + deletedclient);
    var blacklistQuery = "UPDATE client set blacklisted = true where email = \'" + deletedclient + "\'";
    console.log(blacklistQuery);
    var executeblacklist = await sails.sendNativeQuery(blacklistQuery);
    var myQuery = "select firstname, lastname, email from client where blacklisted = false";
    var data = await sails.sendNativeQuery(myQuery);
    return res.view('client', {clientslist : data["rows"]});
  }
};

