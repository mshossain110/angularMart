(function() {
    'use strict';

    angular
        .module('angularMart')
        .service('CartItem', CartItem);

    CartItem.$inject = ['$log'];

    /* @ngInject */
    function CartItem($log) {


      var CartItem = function(id, name, image, price, quantity, data) {
        this.setId(id);
        this.setName(name);
        this.setImage(image);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setData(data);
      };

      CartItem.prototype.setId=function(id){
        if(id && typeof id === 'number'){
          this.id=id;
        }else{
          $log.error("A numaric Id must be provided");
        }
      };

      CartItem.prototype.getId=function(){
        return this.id;
      };
      CartItem.prototype.setName= function(name){
        if(name && typeof name === 'string') {
          this.name= name;
        } else {
          $log.error("A product name must be provieded");
        }
      };
      CartItem.prototype.getName= function(){
        return this.name;
      };
      CartItem.prototype.setImage=function(image){
        if(image) {this.image=image;}
        else {this.image='defaultimges.jpg';}
      };
      CartItem.prototype.getImage=function(){
        return this.image;
      };
      CartItem.prototype.setPrice=function(price){
        var pricef = parseFloat(price);
        if(pricef >=0 ){
          this.price=(pricef);
        }
        else {$log.error("A price must be provided");}
      };
      CartItem.prototype.getPrice=function(){
        return this.price;
      };
      CartItem.prototype.setQuantity=function(quantity, relative){
        var quantityi=parseInt(quantity, 10);
        if(quantityi && quantityi > 0)
        {
          if(relative === true){
            this.quantity +=quantityi;
          }else {
            this.quantity=quantityi;
          }
        }else {
          this.quantity=1;
          $log.info("Quantity must be an integer gratter then 0");
        }
      };
      CartItem.prototype.getQuantity=function(){
        return this.quantity;
      };
      CartItem.prototype.setData=function(data){
        if(data) {this.data=data;}
      };
      CartItem.prototype.getData=function(){
        if(this.data){
            return this.data;
        }else {
          $log.info("This Item has not set any data");
        }
      };
      CartItem.prototype.getTotal=function(){
         this.total= parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);

         return this.total;
      };
      CartItem.prototype.toObject=function(){
        return {
          id : this.getId(),
          name: this.getName(),
          image:this.getImage(),
          price: this.getPrice(),
          quantity: this.getQuantity(),
          total:this.getTotal()
        };
      };

      return CartItem;
    }
})();
