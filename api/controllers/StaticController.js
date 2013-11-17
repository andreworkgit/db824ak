module.exports = {

  'index': function (req, res, next) {
  	/*var oldDateObj = new Date();
  	var newDateObj = new Date(oldDateObj.getTime() + 60000);
  	req.session.cookie.expires = newDateObj;
  	req.session.authenticated = true;

  	console.log(req.session);

  	res.locals.flash = _.clone(req.session.flash);
    res.view('session/new');
    req.session.flash = {};*/
  if (req.isAuthenticated()) {
   return res.redirect('/dashboard');
  }else {
    res.view();
  }
	

  },

}