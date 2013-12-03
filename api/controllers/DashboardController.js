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

    //console.log(req.session.passport.user);

    User.findOne(req.session.passport.user,function foundUser(err,user){
       if(err) return next(err);
       if(req.param('h_tarifa_alu')>user.money){
          return res.redirect('/dashboard');
       }else{

          var convertMetroInKm = (req.param('h_place_distance')/1000).toFixed(2);
          var tempoInHour = convertMetroInKm/req.param('h_mkmperhour');
          var minutes_travel = Math.round((tempoInHour*60).toFixed(2)) * 60000;
          //console.log(req.param('h_place_distance'));
          //console.log(req.param('h_mkmperhour'));
          //console.log(minutes_travel);

          Place.findOne(sel_place, function foundPlaces(err,place){

              var value_assalt = Math.floor((Math.random()*place.vlboxmax)+place.vlboxmin);

              setTimeout(function(){
                console.log('redirecionou '+ user.name);

                  
                var travelObj = {
                  user_id: user.id,
                  place_id: sel_place,
                  vehicle_id: sel_vehicle,
                  value_assalt: value_assalt
                };

                Travel.create(userObj,function userCreated(err,travel){
                  return res.redirect('/dashboard');
                });
              
              },minutes_travel);

              res.view({
                  user : req.user,
                  minutes_travel: minutes_travel
              });


          });


      }

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