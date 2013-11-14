/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  'new' : function(req,res){
  	res.locals.flash = _.clone(req.session.flash);
  	res.view();
  	req.session.flash = {};
  },

  'create' : function(req,res,next){
  	User.create(req.params.all(),function userCreated(err,user){

  		if(err) {//return next(err);
  			console.log(err);
  			req.session.flash = {
  				err : err
  			}
  			return res.redirect('/user/new');

  		}
  		res.json(user);
  		req.session.flash = {};
  	});
  },

  'show' : function(req,res,next){
  	User.findOne(req.param('id'),function userCreated(err,user){

  		if(err) { return next(err);
  		}

  		if(!user) return next();

  		res.view({
  			user:user
  		});
  	});
  },

  'index' : function(req,res,next){
  	User.find(function foundUsers(err,users){

  		if(err) { return next(err);
  		}

  		res.view({
  			users:users
  		});
  	});
  }

};
