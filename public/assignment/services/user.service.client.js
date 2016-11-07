(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        // var users = [
        //
        //         {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //         {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //         {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        //
        //
        // ];

        var api = {

            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser:createUser,
            findUserByUsername:findUserByUsername,
            updateUser:updateUser,
            deleteUser:deleteUser

        };
        return api;


        function findUserByCredentials(username, password){

            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(uid){
            var url = "/api/user/" + uid;
            return $http.get(url);
        }

        function createUser(user){

            return $http.post("/api/user", user);
        }

        function findUserByUsername(username){
            var url = "/api/user/?username=" + username;
            return $http.get(url);
        }


        function updateUser(uid, user){
            var url = "/api/user/" + uid;
            return $http.put(url, user);
        }



        function deleteUser(uid){
            var url = "/apu/user/" + uid;
            return $http.delete(url);
        }

    }
})();