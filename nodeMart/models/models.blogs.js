module.exports =(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;




  var BlogsSchema  = new Schema({
      title:{
        type:String,
        trim:true,
        required:true
      },
      categories: [{
        type:String,
        trim:true
      }],
      featureImage:{
        type:String,
        trim:true
      },
      description:{
        type:String,
      },
      like:{
        type:Number
      },
      dislike:{
        type:Number
      },
      metaTag:[{
        type:String,
        trim:true
      }],
      userRole:{
        type:String
      },
      author:{
        type:Schema.ObjectId,
        ref:"User"
      },
      publishStatus:{
        type:String,
        default: 'public'
      },
      publishDate:Date,
      lastModified:{
        type:Date,
        default: Date.now
      },
      comments:[{
        type:Schema.ObjectId,
        ref:"Comment"
      }]

  });

BlogsSchema.pre('save', function(next){
  if(this.isNew){
    this.publishDate = Date.now
  }

  next();
})



  /*
  **  mongoose model
  */

   return mongoose.model('Blog', BlogsSchema);

}());
