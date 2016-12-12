(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = ($routeParams['uid']);
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

        vm.uid = ($routeParams.uid);


        function init()
        {

            var promise=WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function(user){
                    vm.websites =user.websites;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }

        init();

        function createWebsite()
        {
            if (vm.website.name==null){
                vm.error1=true;
                return('0')
            }
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
        vm.wid = ($routeParams.wid);
        vm.uid = ($routeParams.uid);

        function init() {

            var promise = WebsiteService.findWebsiteById(vm.wid);
            promise
                .success(function(website){
                    vm.website=website;
                    console.log(website);
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });


            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function(user){
                    vm.websites=user.websites;
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });
        }
        init();

        function updateWebsite() {

            if (vm.website.name==null){
                vm.error1=true;
                return('0')
            }
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
            if (vm.website.name==null){
                vm.error1=true;
                return('0')
            }
            var promise = WebsiteService.deleteWebsite(vm.wid);
            promise
                .success(function(website){
                    console.log(website)
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function(bbb)
                {
                    console.log(bbb);
                });

        }


    }
})();