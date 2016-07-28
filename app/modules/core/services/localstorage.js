(function() {
    'use strict';

    angular
        .module('angularMart')
        .factory('localStorage', localStorage);

    localStorage.$inject = ['$window'];

    /* @ngInject */
    function localStorage($window) {
        var service = {
            get: get,
            set:set,
        };

        return service;

        function get(key) {
          if($window.localStorage[key]){
            return $window.localStorage[key];
          }
          return false;
        };

        function set(key, value){
          if(typeof value === 'undefined'){
            $window.localStorage.removeItem(key);
          }else {
            $window.localStorage[key]=value;
          }

          return $window.localStorage[key];
        }
    }
})();
