(function() {
    'use strict';

    angular
        .module('angularMart')
        .directive('starRating', starRating);

    /* @ngInject */
    function starRating() {
        var directive = {
            restrict: 'EA',
            scope: {
                rating: '=ngModel',
                maxRating: '@',
                readOnly: '@',
                click: "&",
                mouseHover: "&",
                mouseLeave: "&"
            },
            template:
                "<i ng-repeat='idx in maxRatings track by $index' ng-class='{active: (hoverValue + _rating) > $index}' \
                        ng-Click='isolatedClick($event, $index + 1)' \
                        ng-mouseenter='isolatedMouseHover($event, $index + 1)' \
                        ng-mouseleave='isolatedMouseLeave($event, $index + 1)'></i>",
            compile:compileFunc,
            controller: Controller,

        };

        return directive;



        function compileFunc(element, attrs){
          if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
              attrs.maxRating = '5';
          };
          if (!attrs.readOnly) {
              attrs.readOnly = 'false';
          };
        }
    }

    Controller.$inject = ['$scope','$element', '$attrs'];

    /* @ngInject */
    function Controller($scope, $element, $attrs) {

        $scope.maxRatings = [];

        for (var i = 1; i <= $scope.maxRating; i++) {
            $scope.maxRatings.push({});
        };

        $scope._rating = $scope.rating;

        $scope.isolatedClick = function (evt, param) {
          if ($scope.readOnly == 'true') return;
          // var eWidth = evt.currentTarget.offsetWidth,
          // mPos = evt.offsetX / eWidth;
          // console.log(mnPos);

          $scope.rating = $scope._rating = param;
          $scope.hoverValue = 0;
          $scope.click({
            param: param
          });
        };

        $scope.isolatedMouseHover = function (evt, param) {
          if ($scope.readOnly == 'true') return;

          $scope._rating = 0;
          $scope.hoverValue = param;
          console.log($scope.hoverValue + $scope._rating);
          $scope.mouseHover({
            param: param
          });
        };

        $scope.isolatedMouseLeave = function (evt, param) {
          if ($scope.readOnly == 'true') return;

          $scope._rating = $scope.rating;
          $scope.hoverValue = 0;
          $scope.mouseLeave({
            param: param
          });
        };
    }
})();
