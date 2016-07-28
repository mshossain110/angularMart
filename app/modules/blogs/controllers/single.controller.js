(function() {
    'use strict';

    angular
        .module('angularMart')
        .controller('articleCtrl', articleCtrl);

    articleCtrl.$injct = ['$scope', '$stateParams', '$http', '$sce', 'Blog'];

    /* @ngInject */
    function articleCtrl($scope, $stateParams, $http, $sce, Blog) {
        var vm = this;
        vm.id=$stateParams.id;

        activate();

        function activate() {
          vm.blog=Blog.get({id:vm.id});
          console.log(vm.blog);
        }
    }
})();
