(function() {
  /**
   * @ngdoc directive
   * @name angularMart.directive:slider
   * @description
   * # slider
   */
    'use strict';

    angular
        .module('angularMart')
        .directive('amSwiper', amSwiper);

    /* @ngInject */
    amSwiper.$inject=['$timeout', '$window']
    function amSwiper($timeout, $window) {
        var directive = {
            transclude:false,
            restrict: 'AC',
            scope:{
              fullScreen: '@',
              options: '=?'
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs, ctrl) {
          var $windowEl = angular.element($window);
          var $header= angular.element('#header');
          var eleHeight;

          scope.windowHeight = $window.innerHeight ? $window.innerHeight : $window.height();
          scope.containerWidth = angular.element('.container').outerWidth();
          // if(scope.fullScreen === 'true'){
          //   eleHeight=scope.windowHeight;
          // }



            var sliderEl= $(element).find('.swiper-parent')


            var swiperSlider = new Swiper( sliderEl ,{
              paginationClickable: false,
              slidesPerView: 1,
              loop: true,
              autoplay: 5000,
              grabCursor: true,
              speed: 1000,
              onSwiperCreated: onSwiperCreated,
              onSlideChangeStart: onSlideChangeStart,
              onSlideChangeEnd: onSlideChangeEnd
            });

            function onSwiperCreated(swiper){
              $('[data-caption-animate]').each(function(){
                var $toAnimateElement = $(this);
                var toAnimateDelay = $(this).attr('data-caption-delay');
                var toAnimateDelayTime = 0;
                if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ) + 750; } else { toAnimateDelayTime = 750; }
                if( !$toAnimateElement.hasClass('animated') ) {
                  $toAnimateElement.addClass('not-animated');
                  var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                  setTimeout(function() {
                    $toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
                  }, toAnimateDelayTime);
                }
              });
            }

            function onSlideChangeStart(swiper){
              $('[data-caption-animate]').each(function(){
                var $toAnimateElement = $(this);
                var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                $toAnimateElement.removeClass('animated').removeClass(elementAnimation).addClass('not-animated');
              });
            }

            function onSlideChangeEnd(swiper){
              $('#slider .swiper-slide.swiper-slide-active [data-caption-animate]').each(function(){
                var $toAnimateElement = $(this);
                var toAnimateDelay = $(this).attr('data-caption-delay');
                var toAnimateDelayTime = 0;
                if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ) + 300; } else { toAnimateDelayTime = 300; }
                if( !$toAnimateElement.hasClass('animated') ) {
                  $toAnimateElement.addClass('not-animated');
                  var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                  setTimeout(function() {
                    $toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
                  }, toAnimateDelayTime);
                }
              });
            }





            // scope.$watchCollection(function () {
            //
            //     return {
            //         'windowHeight': scope.windowHeight,
            //         'windowWidth': $windowEl.innerWidth()
            //     };
            // }, function (newValue, oldValue) {
            //   if(newValue.windowWidth <780){
            //     $(element).css('height', 'auto');
            //   }else{
            //     $(element).css('height', eleHeight);
            //   }
            //
            // });
            //
            // $windowEl.bind('resize', function () {
            //     scope.$digest();
            // });
        }
    }


})();
