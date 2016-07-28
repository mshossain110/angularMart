(function() {
    'use strict';

    angular
        .module('angularMart')
        .factory('Blog', Blog);

    Blog.$inject = ['$resource', 'API'];

    /* @ngInject */
    function Blog($resource, API) {
      return $resource(API +'api/blog/:id', { id: '@_id' }, {
            update: {
              method: 'PUT' // this method issues a PUT request
            }
              },{
            stripTrailingSlashes: false
          });
    }
})();
