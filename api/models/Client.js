/**
 * Client.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {
    firstname : {
      type : "string",
      required: true
    },

    lastname : {
      type : "string",
      required: true
    },

    email : {
      type : "string",
      isEmail: true,
      required : true
    },

    phone : {
      type : "string",
      required : true
    },

    password : {
      type : "string",
      required : true
    },
    blacklisted : {
      type : "boolean",
      defaultsTo : false
      //required : true
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password'])
  },
  beforeCreate: function(client, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(client.password, salt, null, function(err, hash){
        if(err) return cb(err);
        client.password = hash;
        return cb();
      });
    });
  }
};

