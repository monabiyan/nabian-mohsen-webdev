/**
 * Created by mohsennabian on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController);


    function PageListController(PageService,$routeParams)
    {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);

            var promise =PageService.findPagesByWebsiteId(vm.webId)
            promise
                .success(function(pages){
                    vm.pages=pages;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
    }



    function NewPageController($location,PageService,$routeParams)
    {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.createPage=createPage;

        function init()
        {

                var promise = PageService.findPagesByWebsiteId(vm.webId);
                promise
                    .success(function (pages) {
                        vm.pages =pages;
                    })
                    .error(function(bbb)
                    {
                        console.log(bbb);
                    });
        }
        init();


        function createPage()
        {
            vm.page.websiteId=vm.webId;
            var promise=PageService.createPage(vm.webId, vm.page);
            promise
                .success(function(page){
                    console.log(page)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }
    }



    function EditPageController(PageService,$routeParams)
    {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.pageId=parseInt($routeParams['pid']);

        vm.deletePage=deletePage;
        vm.updatePage=updatePage;

        function init(){
                var promise = PageService.findPageById(vm.pageId);
                promise
                    .success(function (page) {

                        vm.page =page;
                    })
                    .error(function(bbb)
                    {
                        console.log(bbb);
                    });
        }
        init();

        function updatePage(){
            console.log("Starbucks")
            var promise=PageService.updatePage(vm.page);
            promise
                .success(function(page){
                    console.log(page)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }

        function deletePage(pageId) {
            var promise=PageService.deletePage(pageId);
            promise
                .success(function(page){
                    console.log(page)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }
    }
})();