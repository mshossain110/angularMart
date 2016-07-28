(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name angularMart.directive:header
     * @description
     * # header
     *@example <am-header></am-header>
     */

    angular
        .module('angularMart')
        .directive('amHeader', amHeader);

        amHeader.$inject=['$document', '$window']
    /* @ngInject */
    function amHeader($document, $window) {

        var directive = {
            restrict: 'EA',
            replace:true,
            templateUrl:templateUrl,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr, ctrl){

              var body=$document[0].body,
               window =$window.window
          scope.$on('$viewContentLoaded', function(){


            //navigation toggle button
            $(element).on('click', 'li a', function(e){
              var parent = $(this).parent('li');
              parent.siblings().each(function(index){
                if($(this).hasClass('ngopen')){
                  $(this).children('.submenu, .megamenu').stop().hide('first');
                  $(this).removeClass('ngopen');
                }
              });

              $(this).parents('li').siblings().find('li').each(function(index){
                if($(this).hasClass('ngopen')){
                  $(this).children('.submenu, .megamenu').stop().hide('first');
                  $(this).removeClass('ngopen');
                }
              });

             if(!parent.hasClass('ngopen')){
                parent.addClass('ngopen').stop().children('.submenu, .megamenu').show('slow');
             }else{
               parent.removeClass('ngopen').stop().children('.submenu, .megamenu').hide('slow');
              }

            });

              //style nav toggle class
              jQuery(window).on('scroll', function() {

                 if(jQuery(this).scrollTop() > 100){
                   $(body).addClass('top-fixed-nav');
                 }else{
                   $(body).removeClass('top-fixed-nav');
                 }
             });

            //search toggle button
            $(element).on('click', '.search i.sicon', function(e){
              e.preventDefault();
              $(element).toggleClass('search-active');
            });

            //cart toggle button
            $(element).find('.cart').hover(function(){
              $(element).addClass('cart-active');
            }, function(){
              $(element).delay(200).removeClass('cart-active');
            });

            //Mobile navigation toggle button
            $(element).on('click', '#navtoggle', function(e){
              e.preventDefault();
              $('body').toggleClass('ngmenu-left');
            });

          });


        };

        function templateUrl(element, attrs) {
          return ( typeof attrs.templateUrl === 'undefined' ) ?  'modules/core/views/header.html': attrs.templateUrl;
        }
    }

})();
