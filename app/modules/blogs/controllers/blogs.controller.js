(function() {
    'use strict';

    angular
        .module('angularMart')
        .controller('blogs', blogs);

    blogs.$inject = ['$scope', '$http', '$sce', '$filter', 'Blog'];

    /* @ngInject */
    function blogs($scope, $http, $sce, $filter, Blog) {
        var vm = this;
        vm.Blogs=[];


        activate();

        function activate() {
          vm.Blogs=Blog.query();
        }

        vm.getBlogs=function(){


        }

        vm.parseContent = function(content){
          var con= $filter('limitTo')(content, 300);
          return $sce.trustAsHtml(con);
          //console.log($sce.trustAsHtml(content))
          //return
        }

        vm.like = function(){

        };
    }
})();
