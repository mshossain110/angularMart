module.exports = (function(){
  "use strict";


  var API_SECRET_KEY = "38f534975f20f375h0923h57023975fh2983f7";
  var User = require('../models/userModel');
  var jwt = require('jsonwebtoken');

  function generateToken(data){
    return jwt.sign(data, API_SECRET_KEY, { expiresIn: 60*60*24});
  }
  function verifyToken(token, callback){
    // callback(error, decode)
    return jwt.verify(token, API_SECRET_KEY, callback);
  }

  return {
    signup: function(req, res, next){

      req.assert('firstName', 'You must enter a Firts Name').notEmpty();
      req.assert('lastName', 'You must enter a Last Name').notEmpty();
      req.assert('email', 'You must enter a valid email address').isEmail();
      req.assert('password', 'Password must be between 8-20 characters long').len(4, 20);
      req.assert('userName', 'Username must be 5-20 characters').len(5, 20);

      var errors = req.validationErrors();
      if (errors) {
          return res.status(400).send(errors);
      }


        User.findOne({$or:[{userName:req.body.userName}, {email:req.body.email}]}, function(error, user){
          if(error) next(error);
          if(user) res.status(400).send({message:'userName or Email already taken'})


              var obj={
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                userName:req.body.userName,
                roles:['subscriber', 'author'],
                provider:'local',
              };


              var user = new User(obj);

              user.save(function(error){

                if(error) next(error);
                var payload = user.toJSON()
                delete payload.password;

                var token = generateToken(payload);

                res.json({user:true, token:token});

              });
        });


    },

    signin:function(req, res, next){
      req.assert('email', 'Email is not valid').isEmail();
      req.assert('password', 'Password cannot be blank').notEmpty();
      var error = req.validationErrors();

      if(error){
      res.status(400).json({error: error,  message:'Email address or password is incorrect'})
      }

      User.findOne({email:req.body.email}, function(error, user){
        if(error)
          res.status(400).json({error: error,  message:'Email address or password is incorrect'})

        if(!user){

            res.status(400).json({error:400, message:'Email address or password is incorrect'})
        }

        if(!user.authenticate(req.body.password)){
          res.status(400).json({error:400, message:'Email address or password is incorrect'});
        }
        else{
          var payload = user.toJSON();
          delete payload.password;

          var token = generateToken(payload);

          res.json({user:true, token:token});

        }

      })

    },
    signOut:function(req, res, next){
      req.logout();
      res.redirect('/');
    },
    resetPassword:function(req, res, next){

    },
    me:function(req, res, next){

    },
    getUsers:function(req, res, next){
      User.find({}, function(error, users){
        if(error) res.json(error);

        res.json(users);
      })
    },

  };
}());
