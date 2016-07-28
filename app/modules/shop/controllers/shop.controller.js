(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularMart.controller:productclrt
     * @description
     * shop page controller.
     * execute for shop left, shop right, shop top pages
     *
     */
    angular
        .module('angularMart')
        .controller('shopCtrl', shopCtrl);

    shopCtrl.$inject = ['$scope', '$element',  'PService',  'amCart', 'amFilterService', '$filter', '$sce', 'product', '$http'];

    /* @ngInject */
    function shopCtrl($scope, $element, PService, amCart, amFilterService, $filter, $sce, product, $http) {
        var vm = this;

        /*add to cart serveice */
        vm.amCart=amCart;

        /*product variable*/
        vm.pagedItems = [];
        vm.items=[];
        vm.itemsPerPage = 12;
        vm.buildPager = buildPager;
        vm.figureOutItemsToDisplay = figureOutItemsToDisplay;

        vm.categories;
        /* set filter service*/
        vm.filters=amFilterService;
        vm.$filters= vm.filters.$filters;

     // vm.products=product.query(function(){
     //
     //   PService.getVariable(vm.products, setVriable);
     // });


     $http.get('data/products.json').then(function(result){
         vm.products = result.data;
         vm.items= vm.products;

         vm.buildPager(vm.products);
       PService.getVariable(vm, vm.products);
     })



    $scope.$on('filter:changed', function(event, data){
      vm.items=$filter('pfilter')(vm.products, data);
      PService.getVariable(vm, vm.items, 'categories');
      vm.buildPager(vm.items);
    })




       /* sidebar == filter section toggle function and variable */
       vm.isFilterbarOpern = true;
       vm.toggleFilterbar= function(){
           return vm.isFilterbarOpern = !vm.isFilterbarOpern;
       };

       /*parse html content*/
       vm.parseContent = function (content) {
           return $sce.trustAsHtml(content);
       };

        function buildPager(items) {

          vm.filteredItems = items;
          vm.filterLength = vm.filteredItems.length;

          vm.currentPage = 1;
          vm.totalPage=[]
          totalPage();
          vm.figureOutItemsToDisplay();
        }


        function figureOutItemsToDisplay() {
          var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
          var end = begin + vm.itemsPerPage;
          vm.pagedItems = vm.filteredItems.slice(begin, end);
        }

        function totalPage(){
          var totalPage=  Math.ceil(vm.filterLength/vm.itemsPerPage);
          for (let i=1; i<=totalPage; i++){
            vm.totalPage.push(i);
          }
        }

        vm.pageChange=function(page){
          vm.currentPage=page;
          vm.figureOutItemsToDisplay();
          $( 'body, html' ).scrollTop( 0 );
        }


        $scope.$watch(function(){
          return vm.itemsPerPage
        }, function(newValue, oldValue){

          if(newValue !==oldValue)
           vm.buildPager(vm.items)
        });



    }
})();
