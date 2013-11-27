/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema:true,
  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/

    uid:{
      type:'string',
      required:true
    },

  	name:{
  		type:'string'
  	},
  	  	
    email:{
  		type:'string',
  		email:true,
  		required:true,
  		unique:true
  	},

    imagem: {
      type:'string',
    },

    url: {
      type:'string',
      required:true,
      unique:true
    },

    online:{
      type:'boolean',
      defaultsTo:false
    }, 

    provider: {
       type:'string',
    },

    transportation: {
      type: 'integer',
      defaultsTo: 1
    },

    money: {
      type: 'integer',
      defaultsTo: 0
    }, 

    banco: {
      type: 'string',
    }

  	/*toJson: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  		return obj;
  			
  	}*/
    
  },

  /*beforeValidation: function(values,next){
    if(typeof values.admin !== 'undefined'){
      if(values.admin === 'unchecked'){
        values.admin = false;
      }else if(values.admin[1] === 'on'){
        values.admin =true;
      }
    }
    next();
  },

  beforeCreate: function (values,next){

    if(!values.password || values.password != values.confirmation){
      return next({err: ["password does't match password confirmation"]});
    }
    //console.dir(values);
    require("bcrypt-nodejs").hash(values.password,null, null,function passwordEncrypted(err,encryptedPassword){
      if(err) return next(err);
      //console.log('pass '+encryptedPassword);
      values.encryptedPassword = encryptedPassword;
      next();
    })

  }*/

};
