(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            generatePageId : generatePageId,
            createPage:createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;



        function generatePageId(pages){
            result = 0;
            if(pages.length > 0){

                result = pages[pages.length - 1]._id + 1;
                console.log(result);
            }

            console.log(result);
            return result;
        }



        function createPage(websiteId, page)
        {
            page.websiteId = websiteId;
            pages.push(page);
        }



        function findPagesByWebsiteId(websiteId){
            result = []
            for(i = 0; i < pages.length; i++){
                if(pages[i].websiteId == websiteId){
                    result.push(pages[i]);
                }
            }
            return result;
        }


        function findPageById(pageId){
            for(i = 0; i < pages.length; i++){
                if(pages[i]._id == pageId){
                    return pages[i];
                }
            }
        }


        function updatePage(pageId, page){
            for(i = 0; i < pages.length; i++){
                if(pages[i]._id == pageId){
                    pages[i] = page;
                }
            }
        }


        function deletePage(pageId){
            pages = pages.filter(function(item) {
                return item._id != pageId;
            })
        }

    }
})();