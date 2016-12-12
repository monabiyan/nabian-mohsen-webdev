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
        vm.userId = ($routeParams['uid']);
        vm.webId = ($routeParams['wid']);
        console.log(vm.userId);
            var promise =PageService.findPagesByWebsiteId(vm.webId);
            promise
                .success(function(pages){
                    console.log('hhhhhh');
                    console.log(pages);
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
        vm.userId = ($routeParams['uid']);
        console.log(vm.userId);
        vm.webId = ($routeParams['wid']);
        vm.createPage=createPage;

        function init()
        {

                var promise = PageService.findPagesByWebsiteId(vm.webId);
                promise
                    .success(function (website) {
                        vm.pages =website.pages;

                    })
                    .error(function(bbb)
                    {
                        console.log(bbb);
                    });
        }
        init();


        function createPage()
        {
            if (vm.page.name==null){
                vm.error1=true;
                return('0')
            }
            vm.page.websiteId=vm.webId;
            var promise=PageService.createPage(vm.webId, vm.page);
            promise
                .success(function(page){
                    $location.url("/user/" + vm.userId + "/website/"+vm.webId+"/page");
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
        vm.userId = ($routeParams['uid']);
        vm.webId = ($routeParams['wid']);
        vm.pageId=($routeParams['pid']);

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

            if (vm.page.name==null){
                vm.error1=true;
                return('0')
            }
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

            if (vm.page.name==null){
                vm.error1=true;
                return('0')
            }

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