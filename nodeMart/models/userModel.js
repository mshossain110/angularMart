module.exports =(function(){
  'use strict';

  var mongoose = require('mongoose');
  var _ = require('lodash');
  var crypto = require('crypto');

  var Schema = mongoose.Schema;


  /**
   * Validations
   */
  var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    return (this.provider && this.provider !== 'local') || (value && value.length);
  };

  var escapeProperty = function(v){
    return _.escape(v);
  };

  var UserSchema  = new Schema({
    firstName:{
      type:String,
      trim:true

    },
    lastName:{
      type:String,
      trim:true
    },
    userName:{
      type:String,
      trim:true,
      lowercase:true,
      unique:true,
      required:[true, 'userName is required']
    },
    email:{
      type:String,
      trim:true,
      unique:true,
      lowercase:true,
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
      required:[true, 'Please fill a valid email address']
    },
    password:{
      type:String,
      default:'',
      validate: [validatePresenceOf, 'must have a password']
    },
    salt:{
      type:String
    },
    profileImageURL:{
      type:String,
    },
    provider:{
      type:String,
      lowercase:true,
      required:[true, 'provider is require']
    },
    socialData:{},
    roles:{
        type: [{ type: String, enum: ['administrator', 'editor', 'author', 'subscriber' ], }],
        default: 'subscriber',
    },
    state:{
        type: [{ type: String, enum: ['active', 'panding', 'deactivate', 'punished'] }],
        default: 'panding'
    },
    update:{
      type:Date
    },
    created:{
      type:Date,
      default:Date.now
    },
    lastLogin:{
      type:Date
    },
    resetPasswordToken:{
      type:String
    },
    resetPasswordExpires:{
      type:Date
    }

  });


  /*
  ** Set salt and pass word save
  */

  UserSchema.pre('save', function(next){
    var _self =this;

    if(this.provider === 'local' && this.password && this.isNew){
      this.salt = crypto.randomBytes(16).toString('base64');
      this.password = this.hashPasswor(this.password);
    }
    next();
  });

  /*
  **Crypoto hash password
  */
  UserSchema.methods.hashPasswor = function(password){
    if(!this.salt && !password) return password;
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha512').toString('base64')

  };

  /*
  ** get full name
  */
  UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
  });

  /**
   * Create instance method for authenticating user
   */
  UserSchema.methods.authenticate = function(password){

    return this.password === this.hashPasswor(password);

  };

  /*
  ** check user roles
  */

  UserSchema.methods.hasRole = function(role){
    return this.roles.indexOf(role) !== -1;
  };

  /*
  **  check for administrator;
  */
  UserSchema.methods.isAdmin = function(){
    return this.roles.indexOf('administrator') !== -1;
  };
  /*
  ** check current state
  */
  UserSchema.methods.hasState = function(state){
    return this.state === state;
  };

  /*
  ** check is user active
  */
  UserSchema.methods.isActive = function(){
    return this.state === 'active';
  };
  //  return the user in object
  UserSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.password;
    delete obj.salt;
    return obj;
  };

  /*
  **  mongoose model
  */

   return mongoose.model('User', UserSchema);

}());
