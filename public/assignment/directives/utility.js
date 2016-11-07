/**
 * Created by mohsennabian on 11/6/16.
 */

(function(){
    angular
        .module("utility",[])
        .directive("sortable", sortable);

    function sortable(){

        function linker(scope, element, attrb) {
            var initial = -1;
            var final = -1;
            var baseUri = element[0].baseURI;
            var pid = baseUri.split("#")[1].split("/")[6];
            $(element).sortable({
                axis : "y",
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    final = $(ui.item).index();
                    scope.sortableController.sort(pid,initial,final);
                }
            });
        }
        var directive = {
            scope : {},
            restrict : 'ACE',
            link : linker,
            controller : sortableController,
            controllerAs : "sortableController"
        };
        return directive;
    }

    function sortableController(WidgetService){
        var vm = this;
        vm.sort = sort;

        function sort(pid,initial, final){
            WidgetService.sort(pid,initial,final);
        }
    }
})();
