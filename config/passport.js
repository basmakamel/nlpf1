const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb){
  Client.findOne({id}, function(err, user) {
    cb(err, users);
  });
});
passport.use(new LocalStrategy({
  returnURL: 'http://example.net:3003/api/auth/google/return',
  usernameField: 'email',
  passportField: 'password'
}, function(username, password, cb){
  Client.findOne({email: username}, function(err, user){
    if(err) return cb(err);
    if(!user) return cb(null, false, {message: 'Username not found'});
    bcrypt.compare(password, user.password, function(err, res){
      if(!res) return cb(null, false, { message: 'Invalid Password' });
      let userDetails = {
        email: user.email,
       // firstname : user.firstname,
        //lastname : user.lastname,
        //phone : user.phone,
        id: user.id
      };
      return cb(null, userDetails, { message: 'Login Succesful'});
    });
  });
}));
