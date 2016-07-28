angular.module('angularMart')
/**
**  @description:
** Angularjs run function will execute when your application is prepear;
**
**/
.run(['$rootScope','amCart', 'localStorage', '$window', '$timeout', 'PService', '$http',
 function($rootScope, amCart, localStorage, $window, $timeout, PService, $http, stellar){

   /**
   **  @description:
   ** state Change fire this function when page change
   ** I have called this function for scroll top and for loding animation
   **
   **/
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        $rootScope.loding=true;

        $( 'body, html' ).scrollTop( 0 );
    })
    $rootScope.$on('$viewContentLoaded', function(){
      $rootScope.loding=false;


    });

    /**
    **  @description:
    ** this function will fire when We will add an product in our cart or update it
    **/

   $rootScope.$on('amCart:change', function(evnt, data){
     amCart.save();
   });
   $rootScope.$on('amCart:update', function(evnt, data){
     amCart.save();
   });

   /**
   **  @description:
   ** This will be restore our cart data if we previously save in localStorage
   ** Or this will initialize cart fot storate
   **/

   if(angular.isString(localStorage.get('amCart'))){
     amCart.restore(JSON.parse(localStorage.get('amCart')));
   }else{
     amCart.init();
     amCart.setShipping(50);
   }


}])
/**
**  @description:
** API constant variable
** this will help your to build api based application
**/
.constant('API', 'http://127.0.0.1:3000/')

;
