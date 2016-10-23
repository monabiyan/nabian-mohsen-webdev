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

        var user = UserService.findUserById(vm.userId);

        if(user != null) {
            vm.user = user;
        }

        function update(username, firstname, lastname){
            var user = UserService.findUserById(vm.userId);
            var updatedUser = {
                username : username,
                firstname : firstname,
                lastname : lastname,
                password : user.password,
                _id : user._id
            }
            UserService.updateUser(vm.userId, updatedUser);

        }

        function goWebsiteList(){
            $location.url("/user/" + vm.userId + "/website");
        }


    }
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {

            var user = UserService.findUserByCredentials(username, password);

            console.log(user);

            if(user === null)
            {
                vm.error = "No such user";
            }
            else {
                $location.url("/user/" + user._id);
            }
        }
    }
    function RegisterController($location,UserService) {

        var vm = this;
        vm.register = register;


        function register(username, password){

            vm.new_id=user_id;
            var user_id = UserService.generateUserId();

            UserService.createUser({_id : user_id, username : username, password : password, firstName:"no record",lastName:"no record"});
            console.log(user_id)
            $location.url("/user/" + user_id);
        }
    }
})();
