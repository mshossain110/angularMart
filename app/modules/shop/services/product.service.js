(function() {
    'use strict';

    angular
        .module('angularMart')
        .factory('product', factory);

    factory.$inject = ['$resource', 'API'];

    /* @ngInject */
    function factory($resource, API) {
      return $resource(API +'api/product/:id', { id: '@_id' }, {
            update: {
              method: 'PUT' // this method issues a PUT request
            }
              },{
            stripTrailingSlashes: false
          });
    }
})();
