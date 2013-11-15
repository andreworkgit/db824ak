
module.exports = function(req, res, next) {

  var sessionUserMatchesId = req.session.User.id === req.param('id');
  var isAdmin = req.session.User.admin;

  if (!(sessionUserMatchesId || isAdmin)) {
  	var requireLoginError = [{name:'noRights',message:'You must be an admin'}]
  	req.session.flash = {
  		err: requireLoginError
  	}
  	res.redirect('/session/new');
  	return;
  }
  next();
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
