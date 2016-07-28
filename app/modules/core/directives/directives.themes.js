'use strict';

/**
 * @ngdoc directive
 * @name angularMart.directive:themes
 * @description
 * # Themes.js file for all directive that works for themes
 * List of directives
 *  # amAnimate  -> animate.css3 angular directive.
 *  === <el am-animate="fadeIn" am-delay="200" repeat="false"></el> ===
 * # amScrollToTop -> Scroll top
 * == <am-scroll-to-top></am-scroll-to-top>
 * # amPageTitle
 * == <am-page-title displayname-property="data.title" abstract-proxy-property="" ></am-page-title>
 */
angular.module('angularMart')
.directive('amAnimate', [ '$timeout', function($timeout){
  return {
    transclude:false,
    restrict: 'A',
    link: function($scope, element, attrs){
      var animationDelay = angular.isDefined(attrs.amDelay) ? parseInt(attrs.amDelay, 10): 200 ;
      var animationRepeat = angular.isDefined(attrs.repeat) ?  true: false;


        if(!element.hasClass('animated')){
          element.addClass('no-animated');
           $timeout(function(){
              element.bind('appear', function(){
                $timeout(function(){
                  element.removeClass('no-animated').addClass(attrs.amAnimate + ' animated');
                }, animationDelay);

              });

              if(animationRepeat){
                element.bind('disappear', function(){
                  $timeout(function(){
                    element.removeClass(attrs.amAnimate + ' animated').addClass('no-animated');
                  }, animationDelay);

                });
              }
          }, 100);

        }
    }

  };
}])

/*gototop*/
.directive('amScrollToTop', [ '$timeout', '$document', 'isMobile',  function($timeout, $document, isMobile){
  return {
    transclude:false,
    replace:true,
    restrict: 'E',
    template: '<a href="" class="amScrollToTop"><span class="fa fa-arrow-circle-up fa-2x"></span> </a>',
    scope:{},
    link: function($scope, element, attrs){
      $timeout(function(){
        if(!isMobile.any()){
             jQuery(window).on('scroll', function() {

                if(jQuery(this).scrollTop() > 300){
                  element.fadeIn(100);
                }else{
                  element.fadeOut(100);
                }
            });
        }
      }, 500)



        jQuery('.amScrollToTop').on('click', function(e){
          e.preventDefault();

          jQuery('html, body').animate({scrollTop : 0},800);
		        return false;
        });
    }

  };
}])
// pagetitle
.directive('amPageTitle', ['$interpolate', '$state', function($interpolate, $state) {
            return {
                restrict: 'E',
                templateUrl: function(elem, attrs) {
                    return attrs.templateUrl || 'modules/core/views/breadcrumbs.html';
                },
                scope: {
                    displaynameProperty: '@',
                    abstractProxyProperty: '@?'
                },
                link: function(scope) {
                    scope.breadcrumbs = [];

                    scope.pageTitle=getDisplayName($state.$current);

                    if ($state.$current.name !== '') {
                        updateBreadcrumbsArray();
                    }
                    scope.$on('$stateChangeSuccess', function() {
                        updateBreadcrumbsArray();
                    });


                    function updateBreadcrumbsArray() {
                        var workingState;
                        var displayName;
                        var breadcrumbs = [];
                        var currentState = $state.$current;

                        while(currentState && currentState.name !== '') {
                            workingState = getWorkingState(currentState);
                            if (workingState) {
                                displayName = getDisplayName(workingState);

                                if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
                                    breadcrumbs.push({
                                        displayName: displayName,
                                        route: workingState.name
                                    });
                                }
                            }
                            currentState = currentState.parent;
                        }
                        breadcrumbs.reverse();
                        scope.breadcrumbs = breadcrumbs;
                    }


                    function getWorkingState(currentState) {
                        var proxyStateName;
                        var workingState = currentState;
                        if (currentState.abstract === true) {
                            if (typeof scope.abstractProxyProperty !== 'undefined') {
                                proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
                                if (proxyStateName) {
                                    workingState = angular.copy($state.get(proxyStateName));
                                    if (workingState) {
                                        workingState.locals = currentState.locals;
                                    }
                                } else {
                                    workingState = false;
                                }
                            } else {
                                workingState = false;
                            }
                        }
                        return workingState;
                    }


                    function getDisplayName(currentState) {
                        var interpolationContext;
                        var propertyReference;
                        var displayName;

                        if (!scope.displaynameProperty) {
                            // if the displayname-property attribute was not specified, default to the state's name
                            return currentState.name;
                        }
                        propertyReference = getObjectValue(scope.displaynameProperty, currentState);

                        if (propertyReference === false) {
                            return false;
                        } else if (typeof propertyReference === 'undefined') {
                            return currentState.name;
                        } else {
                            // use the $interpolate service to handle any bindings in the propertyReference string.
                            interpolationContext =  (typeof currentState.locals !== 'undefined') ? currentState.locals.globals : currentState;
                            displayName = $interpolate(propertyReference)(interpolationContext);
                            return displayName;
                        }
                    }


                    function getObjectValue(objectPath, context) {
                        var i;
                        var propertyArray = objectPath.split('.');
                        var propertyReference = context;

                        for (i = 0; i < propertyArray.length; i ++) {
                            if (angular.isDefined(propertyReference[propertyArray[i]])) {
                                propertyReference = propertyReference[propertyArray[i]];
                            } else {
                                // if the specified property was not found, default to the state's name
                                return undefined;
                            }
                        }
                        return propertyReference;
                    }


                    function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
                        var i;
                        var alreadyUsed = false;
                        for(i = 0; i < breadcrumbs.length; i++) {
                            if (breadcrumbs[i].route === state.name) {
                                alreadyUsed = true;
                            }
                        }
                        return alreadyUsed;
                    }
                }
            };
}])

.directive('amcarousel', [ '$timeout', 'isMobile',  function($timeout, isMobile){
  return {
    transclude : false,
    restrict : 'C',
    scope : {
      pagination : '=?',
      slidesPerView : '=?',
      slidesPerColumn : '=?',
      autoplay : '=?'
    },
    link: function(scope, element, attrs){

      scope.pagination = angular.isDefined(scope.pagination) ? scope.pagination : '.swiper-pagination';
      scope.slidesPerView = angular.isDefined(scope.slidesPerView) ? parseInt(scope.slidesPerView, 10) : 4;
      scope.slidesPerColumn = angular.isDefined(scope.slidesPerColumn) ? scope.slidesPerColumn : 1;
      scope.autoplay = angular.isDefined(scope.autoplay) ? scope.autoplay : '';


        $timeout(function(){
          var swiper = new Swiper(element , {
             pagination: scope.pagination ,
             slidesPerView: scope.slidesPerView,
             slidesPerColumn: scope.slidesPerColumn,
             paginationClickable: true,
             nextButton: '.amCarousel-button-next',
             prevButton: '.amCarousel-button-prev',
             loop: false,
             autoplay:scope.autoplay,
             spaceBetween: 0,
             breakpoints: {
                1024: {
                    slidesPerView: scope.slidesPerView,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: (scope.slidesPerView > 2) ? scope.slidesPerView - 1: 2,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                }
            }
         });
        }, 500)

    }
  }
}])
.directive('amTimer', [function(){
  return{
     restrict: 'EA',
     scope:{
       date: '@'
     },
     template:'<div class="amtimer"><span>{{timeTillEvent.daysLeft}} Days</span><span>{{timeTillEvent.hoursLeft}} Hours</span> <span> {{timeTillEvent.minutesLeft}} Minutes</span><span>{{timeTillEvent.secondsLeft}}seconds</span></div>',
     controller: function($scope, $element, $attrs){


          $scope.timeTillEvent = {};

          var updateClock = function() {
            var days, hours, minutes, seconds;
            var future = new Date($scope.date).getTime();
            var currentTime = new Date().getTime();
            var milliSeconds = Math.floor((future - currentTime) / 1000);

          days = Math.floor(milliSeconds / 86400);
          milliSeconds -= days * 86400;
          hours = Math.floor(milliSeconds / 3600) % 24;
          milliSeconds -= hours * 3600;
          minutes = Math.floor(milliSeconds / 60) % 60;
          milliSeconds -= minutes * 60;
          seconds = milliSeconds % 60;

          $scope.timeTillEvent = {
            daysLeft: days,
            hoursLeft: hours,
            minutesLeft: minutes,
            secondsLeft: seconds
          }
        };

        setInterval(function() {
          $scope.$apply(updateClock);
          }, 1000);

        updateClock();
     }
  }
}])

.directive('flexCarosal', ['$rootScope', function($rootScope){
  return{
     restrict: 'EAC',
     scope:{
       animation: '@',
       controlNav: '@',
       animationLoop: '@',
       itemWidth: '@',
       itemMargin: '@',
       minItems: '@',
       maxItems: '@',
     },

     link:function(scope, element, attrs){
       var options = {}
       options.animation = angular.isDefined(scope.animation) ? scope.animation : "slide";
       options.controlNav= angular.isDefined(scope.controlNav) ? scope.controlNav : '';
       options.animationLoop= angular.isDefined(scope.controlNav) ? true : false;
       options.itemWidth= angular.isDefined(scope.itemWidth) ? parseInt(scope.itemWidth, 10) : 220;
       options.itemMargin= angular.isDefined(scope.itemMargin) ? parseInt(scope.itemMargin, 10) :15;
       options.minItems= angular.isDefined(scope.minItems) ? scope.minItems : 2;
       options.maxItems= angular.isDefined(scope.maxItems) ? scope.maxItems : 4;
       options.controlNav= angular.isDefined(scope.controlNav) ? scope.controlNav : '';
       options.controlNav= angular.isDefined(scope.controlNav) ? scope.controlNav : '';

       $rootScope.$on('$viewContentLoaded', function(){
         $(element).flexslider(options);
       });

     }

   }
}])
