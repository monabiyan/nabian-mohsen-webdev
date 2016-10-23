(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {


        var vm = this;

        vm.createWebsite = createWebsite;

        vm.uid = parseInt($routeParams.uid);


        function init()
        {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();

        function createWebsite()
        {
            vm.website._id = WebsiteService.generateWebsiteId();
            WebsiteService.createWebsite(vm.uid, vm.website);
            $location.url("/user/" + vm.uid + "/website");
        }
    }
    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.wid = parseInt($routeParams.wid);
        vm.uid = parseInt($routeParams.uid);

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.wid);
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.wid, vm.website);
            $location.url("/user/" + vm.uid + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website");
        }


    }
})();