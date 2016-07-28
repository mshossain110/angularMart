'user strict';

angular.module('angularMart')
.controller('homeCtrl', ['$scope','stellar', function($scope, stellar){
/* jshint validthis: true */
  var vm= this;
  vm.ss = [5, 13, 19, 25, 30, 35]
  stellar.window();
}]);
