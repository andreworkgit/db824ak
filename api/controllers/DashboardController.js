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

        Weapons.find(function foundWeapons(err,weapons){

          Travel.find()
          .limit(5).sort('createdAt DESC')
          .then(function(travel){
              
              for(var i in travel){

                for(var j in places){
                  if(places[j].id == travel[i].place_id){
                    travel[i].place_name = places[j].name; 
                  }
                }

                for(var k in vehicles){
                  if(vehicles[k].id == travel[i].vehicle_id){
                    travel[i].vehicle_name = vehicles[k].name; 
                  }
                }

              }

              Userweapons.find({user_id: req.session.passport.user}, function foundUsersweapons(err,userweapons){
                var total_weapon = 0,aux_id,newuserweapons = new Array();
                for(var i in userweapons){
                  for(var j in weapons){
                    //if(weapons[j].id == userweapons[i].weapon_id && aux_id != userweapons[i].weapon_id){
                    if(weapons[j].id == userweapons[i].weapon_id){
                    
                      userweapons[i].weapon_name = weapons[j].name;
                      //newuserweapons[i].weapon_name = weapons[j].name;
                      total_weapon++;
                      newuserweapons.push({weapon_name:weapons[j].name,total: total_weapon});
                      //aux_id = userweapons[i].weapon_id;
                      
                    }
                  }
                  //userweapons[i].weapon_total = total_weapon;
                  //newuserweapons[i].weapon_total = total_weapon;
                }  

                var groups = _.groupBy(userweapons,"weapon_name");

                console.dir(typeof userweapons);
                console.dir(typeof newuserweapons);
                //console.dir(newuserweapons);
                console.dir(userweapons);
                console.dir(groups);

                res.view({
                  user : req.user,
                  places:places,
                  vehicles: vehicles,
                  travels:travel,
                  weapons: weapons,
                  myweapons:groups
                });


              });

              //console.dir(travel);

              

          }).fail(function(err){
              if(err) return next(err);
          })
 
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

  'buy_weapon' : function(req,res,next){

    User.findOne(req.session.passport.user,function foundUser(err,user){
       if(err) return next(err);
       if(req.param('h_weapon_price')>user.money){
          return res.redirect('/dashboard');
       }else{
          var userwObj = {
                    user_id : req.session.passport.user,
                    weapon_id: req.param('sel_weapon')
                  }
          Userweapons.create(user.id,userwObj, function userweaponCreated(err){

            //VERIFICAR TRAVAMENTO PARA ESTE ERRO
            /*if(err) { 
              return res.redirect('/user/edit/'+req.param('id'));
            }*/
            return res.redirect('/dashboard');
            

          });
       }
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

          Place.findOne(req.param('sel_place'), function foundPlaces(err,place){

              var value_assalt = Math.floor((Math.random()*place.vlboxmax)+place.vlboxmin);

              minutes_travel = 10000;
              var timeExec = false;

              timeExec = setTimeout(function(){
                //console.log('redirecionou '+ user.name);

                var travelObj = {
                  user_id: user.id,
                  place_id: req.param('sel_place'),
                  vehicle_id: req.param('sel_vehicle'),
                  value_assalt: value_assalt
                };

                Travel.create(travelObj,function userCreated(err,travel){
                  
                  var sum_money = (user.money + value_assalt) - req.param('h_tarifa_alu');
                  var userObj = {
                    money: sum_money
                  }

                  User.update(user.id,userObj, function userUpdated(err){

                    //VERIFICAR TRAVAMENTO PARA ESTE ERRO
                    /*if(err) { 
                      return res.redirect('/user/edit/'+req.param('id'));
                    }*/
                    //res.redirect('/dashboard');
                    return true;

                  });


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