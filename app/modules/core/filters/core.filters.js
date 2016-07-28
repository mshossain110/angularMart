;(function(){
  'use strict';

// userName -> User Name
  angular
      .module('angularMart')
      .filter('lablecase', lablecase);

      function lablecase(){
        return lablecaseFn(input){
          input = input.replace(/([A-Z])/g, ' $1');
          return input[0].toUpperCase() + input.slice(1);
        }

      }

})();
