module.exports =(function(){
  'use strict';
    var Product=require('../models/models.products');
    return{
      getProducts:getProducts,
      getProduct:getProduct,
      addProduct: addProduct,
      updateProduct: updateProduct,
      deleteProduct: deleteProduct
    };

    function getProducts(req, res, next){
      Product.find({}, function(error, product){
        if(error) next(error);

        res.json(product);
      })

    };

    function getProduct(req, res, next){

    };

    function addProduct(req, res, next){
        var obj={
          title:req.body.title,
          category:req.body.category,
          price: req.body.price,
          stock:req.body.stock,
          rating:req.body.rating,
          colors:req.body.colors.split(','),
          sizes:req.body.sizes.split(','),
          brand:req.body.brand,
          src:req.body.src.split(','),
          overview:req.body.overview,
          description: req.body.description
        }



        var product = new Product(obj);

        product.save(function(error){
          if(error) next(error);

          res.json({message:"product added Successfully", data:product})
        });

    };



    function updateProduct(req, res, next){

    };

    function deleteProduct(req, res, next){

    };



}());
