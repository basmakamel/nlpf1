/**
 * HelloController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  login: function (req, res) {
    return res.view('login', {

    });
  },

  signup: function (req, res) {
    return res.view('signup', {

    });
  },

  hello : function (req, res) {
    var myName = 'Bob';
    return res.view('hello' , {name : myName});
  }

};

