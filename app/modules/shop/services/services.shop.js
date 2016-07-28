'use strict';

/**
 * @ngdoc directive
 * @name angularMart.service:shop
 * @description
 * #
 */
angular.module('angularMart')
.service('PService', [ '$timeout', '$sce', function ($timeout, $sce) {
    this.$products;

    this.init = function(data){
      this.setProducts(data);
    }

    this.setProducts = function(value, cb){
      this.$products = this.$products || [];
      this.$products= _.uniq( _.concat(this.$products, value))
      if( typeof cb === 'function'){
        cb(this.$products);
      }

    }

    this.getProducts= function(cb){
      if( typeof cb === 'function'){
        cb(this.$products);
      }else{
        return this.$products;
      }
    };

    this.isEmpty = function(){
      if( typeof this.$products === 'object' && this.$products.length > 0 ){
        return false;
      }else{
        return true;
      }
    };


    this.getProductByID=function(ids, cb){

      if(_.isArray(ids)){
          var productByID=[];
        _.forEach(this.getProducts(), function(product){
          if(_.indexOf(ids, product.ID) > -1){
            productByID.push(product);
          }
        });
      }else{

          var productByID;
        productByID=  _.find(this.getProducts(), function(o) { return o.ID === parseInt(ids, 10); });

      }
      if( typeof cb === 'function'){
        cb(productByID);
      }else{
        return productByID;
      }

    };

    this.getAllCategory=function(products, cb){
      if(undefined === products ) products =this.$products;
        var category=[];
      _.forEach(products, function(product){
          if(_.indexOf(category, product.category) ===-1){
            category.push(product.category);
          }
      });
      if( typeof cb === 'function'){
        cb(category);
      }else{
        return category;
      }

    };

    this.getProductByCategory=function(category, number, cb){
      var productByCategory=[];
      if(typeof category=== 'undefined') {return false;}
      var num = number ? parseInt(number, 10): null;
      var cat=[];
      if(_.isArray(category)){
        _.forEach(category, function(c){
          cat.push(c.toLowerCase());
        });
      }else {
        cat.push(category.toLowerCase());
      }

      angular.forEach(this.getProducts(), function(product){
        if(cat.indexOf(product.category.toLowerCase()) > -1 && (num >0 || num===null )){
          productByCategory.push(product);
          if(num!==null){
            num--;
          }

        }
      });
      if( typeof cb === 'function'){
        cb(productByCategory);
      }else{
        return productByCategory;
      }

    };

    this.getVariable = function(scope, products){
          var minPrice=1000, maxPrice=0, categories=[], colors=[], sizes=[], brands=[], products = products || this.$products;

          _.forEach(products, function(product){
            var price = parseInt(product.price, 10)
              minPrice = price <= minPrice ? price: minPrice;
              maxPrice = price >= maxPrice ? price: maxPrice;

              if(product.category) categories.push(product.category.toLowerCase());
              if(product.brand ) brands.push(product.brand.toLowerCase());

              if(product.colors && _.isArray(product.colors)){
                _.forEach(product.colors, function(color){
                    colors.push(color.toLowerCase()) ;
                });
              }

              if(product.sizes && _.isArray(product.sizes)){
                _.forEach(product.sizes, function(sizee){
                    sizes.push(sizee.toLowerCase()) ;
                });
              }
          });
          /*set rzslider price range slider options*/
          if(Array.prototype.indexOf.call(arguments, 'priceRange') ===-1){
            scope.priceRange = {
                      minValue:minPrice,
                      maxValue:maxPrice,
                      options: {
                          floor:minPrice,
                          ceil:maxPrice,
                          step: 1,
                          onEnd: function(sliderId, modelValue, highValue){
                            scope.filters.setFilter('pricerange', [modelValue, highValue])
                          }
                      }
                  };
          }


            /* product filter variables*/
            if(Array.prototype.indexOf.call(arguments, 'categories') ==-1)
              scope.categories =_.uniq(categories);

            if(Array.prototype.indexOf.call(arguments, 'brands') ==-1)
            scope.brands =_.uniq(brands);

            if(Array.prototype.indexOf.call(arguments, 'colors') ==-1)
            scope.colors =_.uniq(colors);

            if(Array.prototype.indexOf.call(arguments, 'sizes') ==-1)
            scope.sizes =_.uniq(sizes);



    };

    return this;
}])
