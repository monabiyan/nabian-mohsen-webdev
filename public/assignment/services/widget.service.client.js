(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http){

        // var widgets = [
        //     { wgid: 123, widgetType: "HEADER", pid: 321, size: 2, text: "GIZMODO"},
        //     { wgid: 234, widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
        //     { wgid: 345, widgetType: "IMAGE", pid: 321, width: "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { wgid: 456, widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"},
        //     { wgid: 567, widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
        //     { wgid: 678, widgetType: "YOUTUBE", pid: 321, width: "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { wgid: 789, widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"}
        // ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
        }

        return api;

        function createWidget(widget){
            console.log(widget)
            var url = "/api/page/" + widget.pid + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pid){
            var url = "/api/page/" + pid + "/widget";
            return $http.get(url);
        }

        function findWidgetById(wgid){
            var url = "/api/widget/" + wgid;
            return $http.get(url);
        }

        function updateWidget (widget){
            var url = "/api/widget/" + widget._id;
            return $http.put(url,widget);
        }

        function deleteWidget(wgid){
            var url = "/api/widget/" + wgid;
            return $http.delete(url);
        }
    }
})();
