'use strict';

/**
 * @ngdoc service
 * @name angularMart.isMobile
 * @description
 * # isMobile
 * Service in the angularMartApp.
 */
angular.module('angularMart')
  .factory('isMobile',['$window', function ($window) {

    return {
      Android: function() {
            return $window.navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return $window.navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return $window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return $window.navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return $window.navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    }
  }])
  .factory('stellar', function() {
         return {
             window: function() {
                 jQuery(window).stellar({
         					horizontalScrolling: false,
         					verticalOffset: 150
         				});
             },
             element: function(selector, args) {
                 jQuery(selector).stellar(args);
             }
         }
     })
  ;
