(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService(){

        var widgets = [
            { wgid: 123, widgetType: "HEADER", pid: 321, size: 2, text: "GIZMODO"},
            { wgid: 234, widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
            { wgid: 345, widgetType: "IMAGE", pid: 321, width: "100%",
                "url": "http://lorempixel.com/400/200/"},
            { wgid: 456, widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"},
            { wgid: 567, widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
            { wgid: 678, widgetType: "YOUTUBE", pid: 321, width: "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { wgid: 789, widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"}
        ]

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            generateWidgetId : generateWidgetId
        }

        return api

        function createWidget(pid, widget){
            widget.pid = pid;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pid){
            result = [];
            for(i = 0; i < widgets.length; i++){
                if(widgets[i].pid == pid){
                    result.push(angular.copy(widgets[i]));
                }
            }
            return result;
        }

        function findWidgetById(wgid){
            result = null;
            for(i = 0; i < widgets.length; i++){
                if(widgets[i].wgid == wgid){
                    result = angular.copy(widgets[i]);
                }
            }
            return result;
        }

        function updateWidget(wgid, widget){
            for(i = 0; i < widgets.length; i++){
                if(widgets[i].wgid == wgid){
                    widgets[i] = widget;
                }
            }
        }

        function generateWidgetId(){
            result = 0;
            if(widgets.length > 0){
                result = widgets[widgets.length - 1].wgid + 1;
            }
            return result;
        }

        function deleteWidget(wgid){
            widgets = widgets.filter(function(item) {
                return item.wgid != wgid;
            })
        }
    }
})();
