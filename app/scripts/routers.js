'use strict';

/**
 * @ngdoc overview
 * @name angularMart router
 * @description
 * # angularMartApp
 * application router declear here
 */

angular.module('angularMart').config(function ($stateProvider,
                  $urlRouterProvider,
                  $locationProvider,
                  $httpProvider) {


     $urlRouterProvider.otherwise("/");

     $stateProvider
     /*Home page router*/
     .state('home',{
       url:'/',
       controller: 'homeCtrl as vm',
       templateUrl: 'modules/home/views/home1.html',
       data:{
         title:'Angular Mart'
       }
     })

    /*shop routers*/
     .state('shop',{
       url:'/shop',
       template: '<ui-view />',
       data:{
         title:'Shop'
       }
     }).state('shop.shopLeft',{
       url:'/shop-left',
       controller: 'shopCtrl',
        controllerAs:'vm',
       templateUrl: 'modules/shop/views/shop.html',
       data:{
         title:'Shop Left'
       }
     }).state('shop.shopRight',{
       url:'/shop-right',
       controller: 'shopCtrl',
       controllerAs:'vm',
       templateUrl: 'modules/shop/views/shopright.html'
     }).state('shop.shopTop',{
       url:'/shop-top',
       controller: 'shopCtrl',
        controllerAs:'vm',
       templateUrl: 'modules/shop/views/shoptop.html'
     }).state('shop.cart',{
       url:'/cart',
       controller: 'cartCtrl',
       templateUrl: 'modules/shop/views/cart.html'
     }).state('shop.payment',{
       url:'/payment',
       controller: 'cartCtrl',
       templateUrl: 'modules/shop/views/payment.html'
     }).state('shop.SingleLeft',{
       url:'/SingleLeft',
       controller: 'ShopSingleCtrl',
       controllerAs: 'vm',
       templateUrl: 'modules/shop/views/shopSingleLeft.html',
       data:{
         title:'Shop Single Left Sidebar'
       }
     }).state('shop.Single',{
       url:'/:id',
       controller: 'ShopSingleCtrl',
       controllerAs: 'vm',
       templateUrl: 'modules/shop/views/shopSingle.html',
       data:{
         title:'Shop Single'
       }
     })

     .state('blog',{
        url:'/blog',
        template: '<ui-view />',
     }).state('blog.classic',{
       url:'/classic',
       controller: 'blogs',
       controllerAs: 'vm',
        templateUrl: 'modules/blogs/views/listClasic.html',
       data:{
         title:'Blog Clasic'
       }
     }).state('blog.listClassic',{
       url:'/list-classic',
       controller: '',
       controllerAs: 'vm',
        templateUrl: 'modules/blogs/views/listSidebar.html',
       data:{
         title:'Blog Clasic'
       }
     }).state('blog.single',{
       url:'/:id',
       controller: 'articleCtrl',
       controllerAs: 'vm',
        templateUrl: 'modules/blogs/views/blogs.single.html',
       data:{
         title:'Blog Single'
       }
     })

     .state('account',{
       url:'/account',
        template: '<ui-view />',
       data:{
         title:'Account'
       }
     }).state('account.loginregistation',{
       url:'/loginregistation',
       controller: 'authenticationCtrl',
       controllerAs: 'vm',
        templateUrl: 'modules/account/views/loginPageOne.html',
       data:{
         title:'Login/Registation'
       }
     }).state('account.login',{
       url:'/login',
        controller: 'authenticationCtrl',
        controllerAs: 'vm',
        templateUrl: 'modules/account/views/login.html',
       data:{
         title:'Login'
       }
     }).state('account.registation',{
       url:'/registation',
        controller: 'authenticationCtrl',
        controllerAs: 'vm',
        templateUrl: 'modules/account/views/registation.html',
       data:{
         title:'Registation'
       }
     })

     /*feature routers*/
     .state('feature',{
       url:'/feature',
       template: '<ui-view />'
     }).state('feature.heading',{
       url:'/heading',
       templateUrl: 'modules/elements/views/heading.html'
     }).state('feature.button',{
       url:'/buttons',
       templateUrl: 'modules/elements/views/buttons.html'
     }).state('feature.contentbox',{
       url:'/content-box',
       templateUrl: 'modules/elements/views/elements.contentbox.html'
     }).state('feature.pricingTable',{
       url:'/pricing-table',
       templateUrl: 'modules/elements/views/elements.pricingTable.html'
     }).state('feature.testimonials',{
       url:'/testimonials',
       templateUrl: 'modules/elements/views/elements.testimonials.html'
     }).state('feature.carousel',{
       url:'/carousel',
       templateUrl: 'modules/elements/views/elements.carousel.html'
     }).state('feature.tab',{
       url:'/tabs',
       templateUrl: 'modules/elements/views/elements.tabs.html'
     })

     .state('admin',{
       url:'/admin',
       template: '<ui-view />'
     }).state('admin.bootstrap',{
       url:'/bootstrap-form',
       templateUrl: 'modules/elements/views/admin/bootstrap.html'
     }).state('admin.am-forms',{
       url:'/am-forms',
       templateUrl: 'modules/elements/views/admin/am-forms.html'
     }).state('admin.advanced',{
       url:'/advanced',
       templateUrl: 'modules/elements/views/admin/advance-form.html'
     }).state('admin.frompanel',{
       url:'/from-panel',
       templateUrl: 'modules/elements/views/admin/bootstrap.html'
     })

});
