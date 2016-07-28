'use strict';

/**
 * @ngdoc directive
 * @name angularMart.directive: shop
 * @description
 * # angularMart
 */
angular.module('angularMart')
.directive('amProducts', ['PService', '$sce', function(PService, $sce){
  return {
    transclude:false,
    restrict: 'EA',
    scope: {
      productByIds: '=',
      productByCategory: '@',

    },
    templateUrl: function(element, attrs){
      if ( typeof attrs.templateUrl === 'undefined' ) {
          return 'modules/shop/views/directive/reletedproduct1.html';
      } else {
          return attrs.templateUrl;
      }
    },

    controller: function($scope, $sce){
      $scope.parseContent = function (content) {
          return $sce.trustAsHtml(content);
      };

    },
    link: function(scope, element, attrs){
      console.log(typeof scope.productByIds)

      if(scope.productByCategory){
        PService.getProductByCategory(scope.productByCategory, 6, function(products){
          scope.products=products;
        });
      }

      if(scope.productByIds){
        PService.getProductByID(scope.productByIds, function(products){
          scope.products=products;
        });
      }
    }
  };
}])

.directive('amProductsLarge', ['PService', '$sce', function(PService, $sce){
  return {
    transclude:false,
    restrict: 'EA',
    scope: {
      productByIds: '=',
      productByCategory: '@',

    },
    templateUrl: function(element, attrs){
      if ( typeof attrs.templateUrl === 'undefined' ) {
          return 'modules/shop/views/directive/reletedproduct1.html';
      } else {
          return attrs.templateUrl;
      }
    },

    controller: function($scope, $sce){
      $scope.parseContent = function (content) {
          return $sce.trustAsHtml(content);
      };

    },
    link: function(scope, element, attrs){
      console.log(typeof scope.productByIds)

      if(scope.productByCategory){
        PService.getProductByCategory(scope.productByCategory, 6, function(products){
          scope.products=products;
        });
      }

      if(scope.productByIds){
        PService.getProductByID(scope.productByIds, function(products){
          scope.products=products;
        });
      }

      setTimeout(function () {


  // The slider being synced must be initialized first
  element.find('#carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 120,
    itemMargin: 10,
    mxaItems: 4,
    asNavFor: element.find('#slider')
  });

  element.find('#slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel"
  });

      }, 100);

    }
  };
}])
