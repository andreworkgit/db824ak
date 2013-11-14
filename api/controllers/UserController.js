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
      return res.redirect('/user');
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
  },

  'edit' : function(req,res,next){
    User.findOne(req.param('id'),function foundUser(err,user){

      if(err) { return next(err);
      }

      if(!user) return next();

      res.view({
        user:user
      });

    });
  },

  'update' : function(req,res,next){
    User.update(req.param('id'),req.params.all(), function userUpdated(err){

      if(err) { 
        return res.redirect('/user/edit/'+req.param('id'));
      }

      res.redirect('/user/show/'+req.param('id'));
    });
  },

  'destroy' : function(req,res,next){
    User.findOne(req.param('id'),function foundUser(err,user){

      if(err) return next(err);
      

      if(!user) return next('User does \'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err){
         if(err) return next(err);
      });

      res.redirect('/user');
      
    });
  },

};
