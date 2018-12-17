/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  client: async function (req, res) {
    var myQuery = "select email from client";
    console.log("hello");
    var data = await sails.sendNativeQuery(myQuery);
   // var json = JSON.parse(data);

    console.log(data["rows"][0]["email"]);
    /*
    Client.getDatastore().sendNativeQuery(myQuery, function (err, email){
      if(err || !email.rows.length){

        return res.view('client',{clientslist : "hello"});

      }
      else{
        return res.view('client', {clientslist : data});
      }
    })*/
    return res.view('client', {clientslist : data["rows"][0]["email"]});
  }
};

