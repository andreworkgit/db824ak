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
  	res.view();
  },

  'create' : function(req,res,next){

     var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        password: req.param('password'),
        confirmation: req.param('confirmation'),
      }

  	User.create(userObj,function userCreated(err,user){

  		if(err) {//return next(err);
//  			console.log(err);
  			req.session.flash = {
  				err : err
  			}
  			return res.redirect('/user/new');

  		}

      //log user
      req.session.authenticated = true;
      req.session.User = user;

      user.online = true;
      user.save(function(err,user){
        if(err) return next(err);

        res.redirect('/user/show/'+user.id);
      
      });
      //return res.redirect('/user');
  		//res.json(user);
  		
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

//    console.log(new Date());
//    console.log(req.session.authenticated);

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

    if(req.session.User.admin){
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin'),
      }
    }else{
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
      }
    }

    User.update(req.param('id'),userObj, function userUpdated(err){

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

  'subscribe' : function(req,res){
    User.find(function foundUsers(err,users){

      if(err) return next(err);

      User.subscribe(req.socket);
    
      User.subscribe(req.socket,users);

      res.send(200);
    })
    
  }

};
