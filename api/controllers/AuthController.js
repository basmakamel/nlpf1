const passport = require('passport');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
      req.logIn(user, function(err) {
        if(err) res.send(err);

        //return res.redirect('/book_appt');
      });
    })(req, res);
    if ((req.param("email") == "bob@graffiti.com"))
      res.redirect('/intranet');
    else
      res.redirect('/book_appt?client=' + req.param('email'));
  },
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },
  register: async function (req, res) {
    Client.create(req.body).exec(function(err, result){
      if (err) {
        return res.redirect('/register');
      }
      return res.redirect('/login');
    });


  }
};
