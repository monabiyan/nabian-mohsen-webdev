(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //
        //         { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //         { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //         { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //         { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //         { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //         { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        //
        //
        // ];

        var api = {
            createWebsite:createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite,
        };
        return api;


        function createWebsite(userId, website){
            website.developerId = userId;
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website)
        }


        function findWebsitesByUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }


        function findWebsiteById(wid){
            var url = "/api/website/" + wid;
            return $http.get(url);
        }


        function updateWebsite(wid, website){
            var url = "/api/website/" + wid;
            return $http.put(url, website);
        }


        function deleteWebsite(wid){
            var url = "/api/website/" + wid;
            return $http.delete(url);
        }
    }
})();