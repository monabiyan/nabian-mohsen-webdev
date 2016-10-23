/**
 * Created by mohsennabian on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController);


    function PageListController($location,PageService,$routeParams)
    {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.pages=PageService.findPagesByWebsiteId(vm.webId)

    }



    function NewPageController($location,PageService,$routeParams)
    {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.createPage=createPage;

        function init()
        {
            vm.pages = PageService.findPagesByWebsiteId(vm.webId);
        }
        init();


        function createPage()
        {
            vm.page._id=PageService.generatePageId(vm.pages);
            console.log(vm.page);
            // vm.page._id=2;
            PageService.createPage(vm.webId, vm.page);
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
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(){
            PageService.updatePage(vm.pageId, vm.page);
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId)
        }

    }


})();