(function() {
    'use strict';

    /*
    ** authentication service for using in controller
     */
    angular
        .module('angularMart')
        .service('authentication', authentication);

    authentication.$inject = ['$http', 'API', 'auth'];


    function authentication($http, API, auth){

        return {

          signup: signup,
          signin : signin,
          signout: signout,
          isLogin: isLogin,
          currentUser: currentUser,
          user:user,
          forgetPassword:forgetPassword
        }

        function signup(user){
            return $http.post(API + 'users/signup', user);
        };

       function signin(user){
          return $http.post(API + 'users/signin', user);
        };

        function forgetPassword(user){
           return $http.post(API + 'users/forget-password', user);
         };

       function isLogin (){
          var token = auth.getToken();

          if(token){
            var parse = auth.parseJWT(token);

            return Math.round(Date.now()/1000) < parse.exp;
          }else{
            return false;
          }

        };

      function user(){
        var token = auth.getToken();

        if(token){
          var parse = auth.parseJWT(token);

          if( Math.round(Date.now()/1000) < parse.exp){
            return parse;
          }
        }
        return false;
      }

      function currentUser() {
        var token = auth.getToken();

        if(token){
          var parse = auth.parseJWT(token);

          return parse.userName;
        }
      };

      function signout(){
          auth.removeToken();
        };
    };

/*
  ** auth service for verify jwt
*/
    angular
        .module('angularMart')
        .factory('auth', auth);

        auth.$inject =['localStorage'];

        function auth(localStorage){

          var auth ={
              parseJWT: parseJWT,
              saveToken:saveToken,
              getToken:getToken,
              removeToken:removeToken
          };

          return auth;

          function parseJWT(token){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
          };

           function saveToken(token){
            localStorage.set('am-auth', token);

          };

          function getToken(){
            return localStorage.get('am-auth');
          };

        function removeToken(){
            localStorage.set('am-auth', 'undefined');
          };



        };


/*
** authInterceptor factory to add jwt in your request header and save with every request
** NOTE: Some how your server cannot alowe Authorization header. then you have to set Authorization header request
*/
    angular
      .module('angularMart')
      .factory('authInterceptor', authInterceptor);

      authInterceptor.$inject=['API', 'auth'];

      function authInterceptor(API, auth){
        return {
          request: request,
          response:response
        };

        function request(config){
            var token = auth.getToken();

            if(config.url.indexOf(API) === 0 && token){
              config.headers.Authorization = 'amMart ' + token;
            }

            return config;

        };

        function response(response){
            if(response.config.url.indexOf(API) ===0 && response.data.token){
              auth.saveToken(response.data.token);
            }

            return response;
        }


      };


/*add haeader in configure file*/
  angular.module('angularMart').config(authconfig);

    authconfig.$inject=['$httpProvider'];

    function authconfig($httpProvider){

      // $httpProvider interceptors
      $httpProvider.interceptors.push('authInterceptor')
    }


})();
