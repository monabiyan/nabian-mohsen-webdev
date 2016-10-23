(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [

                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }


        ];

        var api = {
            generateUserId:generateUserId,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser:createUser,
            findUserByUsername:findUserByUsername,
            updateUser:updateUser,
            deleteUser:deleteUser

        };
        return api;


        function generateUserId(){
            result = 0;
            if(users.length > 0){
                result = users[users.length - 1]._id + 1;
            }
            return result;
        }

        function findUserByCredentials(userName, password){

            for(i=0; i< users.length; i++){
                if(users[i].username == userName  && users[i].password == password){
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(userId){
            for(i=0; i< users.length; i++){
                if(users[i]._id == userId){
                    return users[i];
                }
            }
        }

        function createUser(user){
            users.push(user)
        }

        function findUserByUsername(userName){
            for(i=0; i< users.length; i++){
                if(users[i].username == userName){
                    return users[i];
                }
            }
        }


        function updateUser(userId, user){
            for(i=0; i < users.length; i++){
                if(users[i].id == userId){
                    users[i] = user;
                }
            }
        }



        function deleteUser(userId){
            users = users.filter(function(item) {
                return item.id !== userId;
            });
        }

    }
})();