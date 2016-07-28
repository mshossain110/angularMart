module.exports =(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;




  var CommentsSchema  = new Schema({
      commentUser:{
        type:Schema.ObjectId,
        ref:"User"
      },
      userName:String,
      userEmail:String,
      userWebAddress:String,
      description:String,
      status:{
        type:Number,
        default:1
      },
      commentDate:{
        type:Date,
        default: Date.now
      }

  });

  /*
  **  mongoose model
  */

   return mongoose.model('Comment', CommentsSchema);

}());
