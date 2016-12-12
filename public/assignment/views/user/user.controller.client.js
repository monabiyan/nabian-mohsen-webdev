/**
 * Created by mohsennabian on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);


    function ProfileController($routeParams,$rootScope, UserService) {
        var vm = this;
        vm.update = update;
        vm.goWebsiteList = goWebsiteList;





        vm.userId = $routeParams.uid;

        var promise = UserService.findUserById(vm.userId);
        promise
            .success(function(user){
                if(user != '0') {
                    vm.user = user;
                    console.log(vm.user)
                }
            })
            .error(function(bbb)
            {
                console.log(bbb);
            });




        function update(username, firstname, lastname){

            var updatedUser = {
                username : username,
                firstName : firstname,
                lastName : lastname,
                password : vm.user.password
            };
            console.log(updatedUser);
            var promise=UserService.updateUser(vm.userId, updatedUser);
            promise
                .success(function(user){

                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });

        }

        function goWebsiteList(){
            $location.url("/user/" + vm.userId + "/website");
        }
    }



    function LoginController($location, UserService,$rootScope) {
        var vm = this;
        vm.login2 = login2;
        vm.login = login;
        function login2(username, password) {

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user == '0') {
                        vm.error = "No such user";
                    }
                    else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (bbb) {
                    console.log(bbb);
                });

        }


        ///////////////////////////  PassPort Implementation



        function login(username_,password_) {
                vm.error2=false;
                if (username_==null || password_==null){
                vm.error2=true;
                  return ('0') }
            user={username:username_,password:password_};
            UserService
                .login(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    })

        }


        var vm = this;

        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })}



            ///////////////////////////  PassPort Implementation

    }

















    function RegisterController($location,UserService,$rootScope) {

        var vm = this;
        vm.register2 = register2;


        function register2(username, password){



            var promise =UserService.createUser({ username : username, password : password, firstName:"norecord",lastName:"norecord"});
            promise
                .success(function(user)
                {
                    console.log(user._id);
                    $location.url("/user/" +user._id);
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });


        }

        /////////////////////////  implementation of passport start
        vm.register = register;
        function register(username1,pass,pass_v) {
            if (username1==null || pass==null || pass_v==null){
                vm.error1=true;
                return('0')
            }
            if (pass!=pass_v){
                vm.error2=true;
                return('0')
            }
            user={username:username1,password:pass};
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    })
        }
        /////////////////////////  implementation of passport finish

    }
})();
