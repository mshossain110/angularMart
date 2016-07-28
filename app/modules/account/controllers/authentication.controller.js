(function() {
    'use strict';

    angular
        .module('angularMart')
        .controller('authenticationCtrl', authenticationCtrl);

    authenticationCtrl.$inject = ['authentication'];

    /* @ngInject */
    function authenticationCtrl(authentication) {
        var vm = this;

        vm.user=authentication.user;
        vm.signup= signup;
        vm.signin= signin;
        vm.forget= forget;


        function signup(valid){
          if(valid && !authentication.isLogin()){
            var obj={
              firstName:vm.reguser.firstName,
              lastName:vm.reguser.lastName,
              userName:vm.reguser.userName,
              email:vm.reguser.email,
              phone:vm.reguser.phone,
              password:vm.reguser.password,

            }

            authentication.signup(obj).then(function(response){
                /*TODO: add your code */
            }, function(error){
              /*TODO: add your code */
            });

          }
        }

        function signin(valid){
          if(valid && !authentication.isLogin()){
            var obj={
              email:vm.loginuser.email,
              password: vm.loginuser.password
            }
                authentication.signin(obj).then(function(result){
                /*TODO: add your code */
                }, function(error){
                  /*TODO: add your code */
                })
          }
        }


        function forget(valid){
          if(valid && !authentication.isLogin()){
            var obj={
              email:vm.fogetform.email
            }

            authentication.forgetPassword(obj).then(function(response){
              /*TODO: add your code */
            }, function(error){
              /*TODO: add your code */
            })
          }
        }
    }
})();
