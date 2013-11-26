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

        User.findOne({_id:places[i].dono_id}, function foundUser(err,userf){
          //console.dir(userf);
          places[i].dono_nome = userf.name;
        });
      }

        res.view({
            user : req.user,
            places:places
        });


    });


  }

}