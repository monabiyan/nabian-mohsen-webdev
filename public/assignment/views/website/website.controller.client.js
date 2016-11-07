(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        var promise = WebsiteService.findWebsitesByUser(vm.userId);
        promise
            .success(function (websites)
            {
                vm.websites =websites;
            })
            .error(function(bbb)
            {
                console.log(bbb);
            });
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {


        var vm = this;

        vm.createWebsite = createWebsite;

        vm.uid = parseInt($routeParams.uid);


        function init()
        {

            var promise=WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function(websites){
                    vm.websites =websites;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }

        init();

        function createWebsite()
        {
            var promise=WebsiteService.createWebsite(vm.uid, vm.website);
            promise
                .success(function(website){
                    console.log(website)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
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

            var promise = WebsiteService.findWebsiteById(vm.wid);
            promise
                .success(function(website){
                    vm.website=website;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });


            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function(websites){
                    vm.websites=websites;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }
        init();

        function updateWebsite() {
            var promise = WebsiteService.updateWebsite(vm.wid, vm.website);
            promise
                .success(function(website){
                    console.log(website)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
            $location.url("/user/" + vm.uid + "/website");
        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.wid);
            promise
                .success(function(website){
                    console.log(website)
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
            $location.url("/user/" + vm.uid + "/website");
        }


    }
})();