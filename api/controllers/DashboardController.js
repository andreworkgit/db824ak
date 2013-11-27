module.exports = {

  'index': function (req, res,next) {
  	/*var oldDateObj = new Date();
  	var newDateObj = new Date(oldDateObj.getTime() + 60000);
  	req.session.cookie.expires = newDateObj;
  	req.session.authenticated = true;

  	console.log(req.session);

  	res.locals.flash = _.clone(req.session.flash);
    res.view('session/new');
    req.session.flash = {};*/
    //console.dir(req.user);
    /* ATENÇÂO CRIAR POLICIES DESTE TREXO */
    if(req.user.banco == undefined){
      return res.redirect('/dashboard/whatbank');
    }
   
    Place.find(function foundPlaces(err,places){

      if(err) return next(err);

      Vehicle.find(function foundVehicles(err,vehicles){

        if(err) return next(err);
        
        res.view({
          user : req.user,
          places:places,
          vehicles: vehicles
        });
      });

    });

    //res.view({user : req.user});


    
  },

  'whatbank' : function(req,res,next) {
    Place.find({isbank:true},function foundPlaces(err,places){

      if(err) return next(err);

      for(var i in places){
        //console.log(places[i].name);

        User.findOne({id:places[i].dono_id}, function foundUser(err,userf){
          //console.dir(userf);
          places[i].dono_nome = userf.name;
        });
      }

        res.view({
            user : req.user,
            places:places
        });


    });


  },


  'travel' : function(req,res,next){

    //console.log(req.param('id'));

    res.view({
        user : req.user
    });

  },


  'wb_registre' : function(req,res,next){

    //console.log(req.param('id'));

    var userObj = {
        banco: req.param('sel_banco_wb')
      }

    User.update(req.param('id'),userObj, function userUpdated(err){

      if(err) { 
        return res.redirect('/dashboard/whatbank');
      }
      return res.redirect('/dashboard');
    });
    

  }

}