/**
 * Created by mohsennabian on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);


    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.update = update;
        vm.goWebsiteList = goWebsiteList;



        vm.userId = parseInt($routeParams.uid);

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
                firstname : firstname,
                lastname : lastname,
                password : vm.user.password,
                _id : vm.user._id
            }
            var promise=UserService.updateUser(vm.userId, updatedUser);
            promise
                .success(function(user){
                    console.log(user)
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



    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function(user)
                    {
                        if(user =='0')
                        {
                            vm.error = "No such user";
                        }
                        else {
                            $location.url("/user/" + user._id);
                        }
                    })
                .error(function(bbb)
                {
                    console.log(bbb);
                });



        }
    }
    function RegisterController($location,UserService) {

        var vm = this;
        vm.register = register;


        function register(username, password){



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
    }
})();
