(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularMart.controller:ShopSingleCtrl
     * @description
     * shop single page controller
     *  execute at shop single page
     */

    angular
        .module('angularMart')
        .controller('ShopSingleCtrl', ShopSingleCtrl);

    ShopSingleCtrl.$inject = ['$scope', '$http', '$stateParams', '$element','$timeout', 'PService', 'amCart', '$sce', '$filter'];

    /* @ngInject */
    function ShopSingleCtrl($scope, $http, $stateParams, $element, $timeout, PService, amCart,  $sce, $filter) {
        /*vm for product single controller*/
        var vm = this;

        vm.Productid=$stateParams.id;
        console.log(vm.Productid)
        if(typeof vm.Productid === 'undefined'){
          vm.Productid=1;
        }
        $http.get('data/products.json').then(function(result){
          angular.forEach(result.data, function(product){

            if(product._id == vm.Productid){
              vm.singleProduct = product;

            }
          });



        })

        /*add to cart serveice */
        vm.amCart=amCart;


        vm.qt=1;
        vm.decrease= function(){
          if(vm.qt > 1 ) vm.qt = vm.qt -1;
        }
        vm.increase = function(){
          if(vm.qt < vm.singleProduct.stock) vm.qt = vm.qt + 1;
        }

        vm.parseContent = function (content) {
            return $sce.trustAsHtml(content);
        };

        $timeout(function(){
          $('.flexslider').flexslider({

            animation: "slide",
            controlNav: "thumbnails"
          });

        },500)


        /**
         * @ngdoc function
         * @name angularMart.controller:commentsCtrl
         * @description
         *  comment controller for manage comment and review your product
         */

        /*  load some sample comment data for comments */
        $scope.comments = [
            {
                id: 1,
                author: {
                    name: 'Jan-Kanty Pawelski',
                    email: 'jan.kanty.pawelski@gmail.com',
                    website: 'pawelski.io'
                },
                content: 'This is awesome product.!! very very helpful seller',
                loved: false
            },
            {
                id: 2,
                author: {
                    name: 'Tomasz Jakut',
                    email: 'comandeer@comandeer.pl',
                    website: 'comandeer.pl'
                },
                content: 'Nice looking. Good job dude ;)',
                loved: true
            },
            {
                id: 3,
                author: {
                    name: 'Jan-Kanty Pawelski',
                    email: 'jan.kanty.pawelski@gmail.com',
                    website: 'pawelski.io'
                },
                content: '<span class="reply">@Tomasz Jakut</span> Thanks man. I tried hard.',
                loved: false
            },
            {
                id: 4,
                author: {
                    name: 'Grzegorz Bąk',
                    email: 'szary.elf@gmail.com',
                    website: 'gregbak.com'
                },
                content: 'Third! Amazing product man! ',
                loved: false
            }
        ];

        /*parse html content*/
        $scope.parseContent = function (content) {
            return $sce.trustAsHtml(content);
        };

        $scope.tr=5;






        activate();

        function activate() {

        }
    }
})();
