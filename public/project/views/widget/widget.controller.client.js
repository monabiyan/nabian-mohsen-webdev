(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce,$routeParams, WidgetService){
        var vm  = this;
        vm.userId  = $routeParams.uid;
        vm.webId  = $routeParams.wid;
        vm.pageId= $routeParams.pid;
        vm.wigId = $routeParams.wgid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {

                var promise=WidgetService.findWidgetsByPageId(vm.pageId);
                promise
                    .success(function(widgets){
                        vm.widgets =widgets;
                    })
                    .error(function(bbb)
                    {
                        console.log(bbb);
                    });
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location){

             var vm = this;
             vm.uid  = $routeParams.uid;
             vm.wid  = $routeParams.wid;
             vm.pid  = $routeParams.pid;
             vm.createWidget = createWidget;

             function init() {

                    var promise = WidgetService.findWidgetsByPageId(vm.pid);
                    promise
                        .success(function(widgets){
                            vm.widgets =widgets;
                        })
                        .error(function(bbb)
                        {
                            console.log(bbb);
                        });
             }
             init();

             function createWidget(widgetType){

                 var newWidget = { widgetType : widgetType ,pid:vm.pid};
                 console.log(newWidget)
                 var promise=WidgetService.createWidget(newWidget);
                 promise
                     .success(function(widget){
                         console.log(widget);

                        widgetNew=widget;
                         $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widgetNew._id);
                     })
                     .error(function(bbb)
                     {
                         console.log(bbb);
                     });



             }
    }

     function EditWidgetController($routeParams, WidgetService, $location){

             var vm = this;
             vm.uid  = $routeParams.uid;
             vm.wid  = $routeParams.wid;
             vm.pid  = $routeParams.pid;
             vm.wgid = $routeParams.wgid;
             vm.updateWidget = updateWidget;
             vm.deleteWidget = deleteWidget;

             function init() {

                 var promise= WidgetService.findWidgetsByPageId(vm.pid);
                 promise
                     .success(function(widgets){
                         vm.widgets=widgets;
                     })
                     .error(function(bbb)
                     {
                         console.log(bbb);
                     });

                 var promise= WidgetService.findWidgetById(vm.wgid);
                 promise
                     .success(function(widget){
                         vm.widget=widget;
                     })
                     .error(function(bbb)
                     {
                         console.log(bbb);
                     });
             }
             init();

             function updateWidget(){
                 var promise=WidgetService.updateWidget(vm.widget);
                 promise
                     .success(function(widget){
                         console.log(widget);
                     })
                     .error(function(bbb)
                     {
                         console.log(bbb);
                     });
                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
             }

             function deleteWidget(){
                 var promise = WidgetService.deleteWidget(vm.wgid);
                 promise
                     .success(function (widget) {
                         consloe.log(widget);
                     })
                     .error(function(bbb)
                     {
                         console.log(bbb);
                     });
                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
             }
     }
})();
