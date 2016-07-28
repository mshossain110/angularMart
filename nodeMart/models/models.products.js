module.exports =(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;




  var ProductsSchema  = new Schema({
    //"ID": 1,
      title:{
        type:String,
        trim:true,
      },
      category: {
        type:String,
        trim:true
      },
      price:{
        type:Number,
      },
      stock:{
        type:Number,
      },
      rating:{
        type:Number,
      },
      colors:[{
        type:String,
        trim:true
      }],
      size:[{
        type:String,
        trim:true
      }],
      brand:{
        type:String,
        trim:true
      },
      src:[{
        type:String,
        trim:true
      }],
      overview:{
        type:String,

      },
      description:{
        type:String,
      }
  });





  /*
  **  mongoose model
  */

   return mongoose.model('Product', ProductsSchema);

}());
