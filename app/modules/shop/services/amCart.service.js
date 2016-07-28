(function() {
    'use strict';

    angular
        .module('angularMart')
        .service('amCart', amCart);

    amCart.$inject = ['$rootScope', 'CartItem', 'localStorage'];

    /* @ngInject */
    function amCart($rootScope, CartItem, localStorage) {


        this.init=init;
        this.addItem=addItem;
        this.getItemById=getItemById;
        this.setCart=setCart;
        this.getCart=getCart;
        this.setShipping=setShipping;
        this.setQuantity=setQuantity;
        this.getShipping=getShipping;
        this.setTaxRate= setTaxRate;
        this.getTaxRate= getTaxRate;
        this.totalTax= totalTax;
        this.getAllItems=getAllItems;
        this.getAmmountOfItems=getAmmountOfItems;
        this.getSubTotal=getSubTotal;
        this.getTotal=getTotal;
        this.removeItemById=removeItemById;
        this.isEmpty=isEmpty;
        this.toObject=toObject;
        this.restore=restore;
        this.save=save;


      function init(){
        this.$cart={
          items: [],
          TaxRate:0,
          shippingPrice: 0
        };
      };



      function addItem(id, name, image, price, quantity, data){
        var inCart= this.getItemById(id);
        if(typeof inCart === 'object' ){
          inCart.setQuantity(quantity, false);
          $rootScope.$broadcast('amCart:update', inCart);
        }else{
          var newItem= new CartItem(id, name, image, price, quantity, data);
          this.$cart.items.push(newItem);
           $rootScope.$broadcast('amCart:add', newItem);
        }
         $rootScope.$broadcast('amCart:change', {});
      };



      function getItemById(id){
        var items= this.getCart().items;
        var iditem;
        angular.forEach(items, function(item){
          if(item.getId()===id){
            iditem=item;
          }
        });
        return iditem;
      };




      function getCart(){
        return this.$cart;
      };




      function setCart(cart){
        this.$cart=cart;
        return this.getCart();
      };




      function setShipping(shipping){
        this.$cart.shippingPrice=shipping;
        return this.getShipping();
      };



      function getShipping(){
        if(this.$cart.shippingPrice !=='null'){
          return this.$cart.shippingPrice;
        }
      };

      function setTaxRate(TaxRate){
        this.$cart.TaxRate=TaxRate;
        return this.getShipping();
      };



      function getTaxRate(){
        if(this.$cart.TaxRate !=='null'){
          return this.$cart.TaxRate;
        }
      };

      function totalTax(){
        return (parseFloat(this.getTaxRate())/100)* parseFloat(this.getSubTotal())

      }



      function setQuantity(id, q){
        var inCart= this.getItemById(id);
        if(typeof inCart === 'object' ){
          inCart.setQuantity(q, false);
          $rootScope.$broadcast('amCart:update', inCart);
        }

      };




      function getAllItems(){
        return this.$cart.items;
      };


      function getAmmountOfItems(){
        var count=0;
        var items=this.$cart.items;
        angular.forEach(items, function(item){
          count +=item.getQuantity();
        });
        return count;
      };




      function getSubTotal(){
        var total=0;
        var items =this.$cart.items;
        angular.forEach(items, function(item){
          total += parseFloat(item.getTotal()) ;
        });
        return total;
      };



      function getTotal(){
        var total = this.getSubTotal();
        if(this.$cart.shippingPrice && this.$cart.shippingPrice > 0 ){
          total= total + this.$cart.shippingPrice
        }

        if(this.$cart.TaxRate && this.$cart.TaxRate > 0 ){
          total=total + this.totalTax();
        }
        return total;
      };


      function removeItemById(id){
        var cart=this.getCart();
        var removedItem;
        angular.forEach(cart.items, function(item, index){
          if(item.getId()===id){
            removedItem = cart.items.splice(index, 1)[0] || {};
          }
        });

        this.setCart(cart);
         $rootScope.$broadcast('amCart:change', {});
         $rootScope.$broadcast('amCart:remove', removedItem);
        return removedItem;
      };




      function isEmpty(){
        return this.getCart().items.length >0 ? false: true;
      };




      function toObject(){
        if(this.getCart().items.length <0) {return false;}

        var items=[];
        angular.forEach(this.getAllItems(), function(item){
          items.push(item.toObject());

        });

        return{
          shipping:this.getShipping(),
          subTotal: this.getSubTotal(),
          TaxRate:this.getTaxRate(),
          items: items
        };

      };




      function restore(cart){

          var _self=this;
          _self.init();
          _self.$cart.shippingPrice=cart.shipping;
          _self.$cart.TaxRate=cart.TaxRate;
          _self.subTotal= cart.subTotal;
          angular.forEach(cart.items, function(item){
            _self.$cart.items.push(new CartItem(item.id, item.name, item.image, item.price, item.quantity, item.data));
          });


          this.save();
      };

      function save(){
        $rootScope.$broadcast('amCart:beforeSave', {});
        return localStorage.set('amCart', JSON.stringify(this.toObject()));

      };

    }
})();
