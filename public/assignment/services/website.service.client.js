(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [

                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }


        ];

        var api = {
            generateWebsiteId : generateWebsiteId,
            createWebsite:createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite,
        };
        return api;


        function generateWebsiteId(){
            result = 0;
            if(websites.length > 0){
                return websites[websites.length - 1]._id + 1
            }
        }


        function createWebsite(userId, website){
            website.developerId = userId;
            websites.push(website);
        }


        function findWebsitesByUser(userId){
            result = [];
            for(i = 0; i < websites.length; i++){
                if(websites[i].developerId == userId){
                    result.push(websites[i]);
                }
            }
            return result;
        }


        function findWebsiteById(websiteId){
            for(i = 0 ; i < websites.length; i++){
                if(websites[i]._id == websiteId){
                    return websites[i];
                }
            }
        }


        function updateWebsite(websiteId, website){
            for(i = 0; i < websites.length; i++){
                if(websites[i]._id == websiteId){
                    websites[i] = website;
                }
            }
        }


        function deleteWebsite(websiteId){
            websites = websites.filter(function(item) {
                return item._id != websiteId;
            })
        }
    }
})();