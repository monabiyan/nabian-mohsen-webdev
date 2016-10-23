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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
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
                 vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
             }
             init();

             function createWidget(widgetType){
                 vm.wgid = WidgetService.generateWidgetId();
                 var newWidget = {wgid : vm.wgid, widgetType : widgetType};
                 WidgetService.createWidget(vm.pid, newWidget);
                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
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
                 vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
                 vm.widget = WidgetService.findWidgetById(vm.wgid);
             }
             init();

             function updateWidget(){
                 WidgetService.updateWidget(vm.wgid, vm.widget);
                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
             }

             function deleteWidget(){
                 WidgetService.deleteWidget(vm.wgid);
                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
             }
     }
})();
