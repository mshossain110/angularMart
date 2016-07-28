(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularMart.controller:cartCtrl
     * @description
     * cart controller
     *
     */

    angular
        .module('angularMart')
        .controller('cartCtrl', cartCtrl);

    cartCtrl.$inject = ['$scope', 'amCart'];

    /* @ngInject */
    function cartCtrl($scope, amCart) {
        var vm = this;
        
        $scope.amCart=amCart;

        vm.qt=1;
        vm.decrease= function(){
          if(vm.qt > 1 ) vm.qt = vm.qt -1;
        }
        vm.increase = function(){
          if(vm.qt < 10) vm.qt = vm.qt + 1;
        }
    }
})();
