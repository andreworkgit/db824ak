/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  new: function (req, res) {
  	/*var oldDateObj = new Date();
  	var newDateObj = new Date(oldDateObj.getTime() + 60000);
  	req.session.cookie.expires = newDateObj;
  	req.session.authenticated = true;

  	console.log(req.session);

  	res.locals.flash = _.clone(req.session.flash);
    res.view('session/new');
    req.session.flash = {};*/
    res.view('session/new');
  },

  create: function(req, res, next){

  	if(!req.param('email') || !req.param('password') ){

  		var usernamePasswordRequiredError = [{name:'usernamePasswordRequired',message:'You must enter both a username and password'}];

  		req.session.flash = {
  			err: usernamePasswordRequiredError
  		}

  		res.redirect('/session/new');
  		return;
  	}

  	User.findOneByEmail(req.param('email')).done(function(err,user){
  		if(err) return next(err);

  		if(!user){
  			var noAccountError = [{name:'noAccount',message:'The email address '+req.param('email')+' not found.'}]
  			req.session.flash = {
  				err: noAccountError
  			}
  			res.redirect('/session/new');
  			return;
  		}

  		require("bcrypt-nodejs").compare(req.param('password'),user.encryptedPassword, function(err,valid){
  			if (err) return next(err);

  			if(!valid){
  				var usernamePasswordMismastchError = [{name:'usernamePasswordMismastch',message:'Invalid username and password combination.'}];
  				req.session.flash = {
  					err: usernamePasswordMismastchError
  				}
  				res.redirect('/session/new');
  				return;
  			}

  			req.session.authenticated = true;
  			req.session.User = user;

  			if(req.session.User.admin){
  				res.redirect('/user');
  				return;
  			}

  			res.redirect('/user/show/'+user.id);
  		});

  	});

  },

  destroy : function(req, res, next){

  	req.session.destroy();
  	res.redirect('/session/new');
  }
  

};
